// Latest posts from the Luxakari Instagram account. Server-only.
//
// Source 1 (preferred): a Behold feed URL (see BEHOLD_FEED_URL below).
// Source 2 (fallback): the Instagram API with Instagram Login. Setup: put a long-lived Instagram user access token in INSTAGRAM_ACCESS_TOKEN.
// Long-lived tokens expire after 60 days unless refreshed, so the current token
// is kept in MongoDB (collection `luxakari_settings`, _id "instagram") and
// refreshed about once a week. Replacing the env value starts over from it.

export const INSTAGRAM_URL = "https://www.instagram.com/luxakari/";
export const INSTAGRAM_HANDLE = "luxakari";

// Hand-picked posts shown with Instagram's own embed when no automatic feed
// (Behold or API token) is configured. Newest first; add or remove links here.
export const FEATURED_POSTS = [
  "https://www.instagram.com/p/Dfzrqq1iIGF/",
  "https://www.instagram.com/p/DfturdjlQfa/",
  "https://www.instagram.com/p/DfZIv8Yyngx/",
  "https://www.instagram.com/p/Dc4lrmMCC_s/",
  "https://www.instagram.com/p/DZ2OvJyCAUa/",
];

const API = "https://graph.instagram.com";
const REFRESH_EVERY_MS = 7 * 24 * 60 * 60 * 1000;

export interface InstagramPost {
  id: string;
  caption: string;
  isVideo: boolean;
  imageUrl: string;
  permalink: string;
  timestamp: string;
}

interface StoredToken {
  _id: string;
  token: string;
  seededFrom: string;
  refreshedAt: Date;
}

async function settings() {
  const { connectToDatabase } = await import("./mongodb");
  const m = await connectToDatabase();
  return m.connection.db!.collection<StoredToken>("luxakari_settings");
}

async function getToken(): Promise<string | null> {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!envToken) return null;

  try {
    const col = await settings();
    const stored = await col.findOne({ _id: "instagram" });
    const current = stored && stored.seededFrom === envToken ? stored : null;
    const token = current?.token ?? envToken;
    const age = current ? Date.now() - new Date(current.refreshedAt).getTime() : Infinity;

    if (age > REFRESH_EVERY_MS) {
      const res = await fetch(
        `${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const { access_token } = (await res.json()) as { access_token?: string };
        if (access_token) {
          await col.updateOne(
            { _id: "instagram" },
            { $set: { token: access_token, seededFrom: envToken, refreshedAt: new Date() } },
            { upsert: true },
          );
          return access_token;
        }
      }
    }
    return token;
  } catch {
    // Database unavailable: the env token still works until it expires.
    return envToken;
  }
}

// Behold (behold.so) feed: Behold holds the Instagram connection and serves the
// latest posts as public JSON, so no token is needed here. The feed URL is not
// a secret. INSTAGRAM_FEED_URL overrides the default below.
const BEHOLD_FEED_URL = "";

interface BeholdPost {
  id: string;
  permalink: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  sizes?: { medium?: { mediaUrl?: string }; large?: { mediaUrl?: string } };
}

async function getBeholdPosts(url: string, limit: number): Promise<InstagramPost[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = (await res.json()) as BeholdPost[] | { posts?: BeholdPost[] };
    const posts = Array.isArray(json) ? json : json.posts ?? [];
    return posts
      .slice(0, limit)
      .map((p) => {
        const isVideo = p.mediaType === "VIDEO";
        return {
          id: p.id,
          caption: p.prunedCaption ?? p.caption ?? "",
          isVideo,
          // Behold's resized copies are always images, even for videos.
          imageUrl:
            p.sizes?.medium?.mediaUrl ?? p.sizes?.large?.mediaUrl ?? (isVideo ? p.thumbnailUrl : p.mediaUrl) ?? "",
          permalink: p.permalink,
          timestamp: p.timestamp,
        };
      })
      .filter((p) => p.imageUrl);
  } catch {
    return [];
  }
}

export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  const feedUrl = process.env.INSTAGRAM_FEED_URL?.trim() || BEHOLD_FEED_URL;
  if (feedUrl) {
    const posts = await getBeholdPosts(feedUrl, limit);
    if (posts.length) return posts;
  }

  const token = await getToken();
  if (!token) return [];

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(
      `${API}/me/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const { data } = (await res.json()) as {
      data?: {
        id: string;
        caption?: string;
        media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
        media_url?: string;
        thumbnail_url?: string;
        permalink: string;
        timestamp: string;
      }[];
    };
    return (data ?? [])
      .map((p) => {
        const isVideo = p.media_type === "VIDEO";
        return {
          id: p.id,
          caption: p.caption ?? "",
          isVideo,
          imageUrl: (isVideo ? p.thumbnail_url : p.media_url) ?? "",
          permalink: p.permalink,
          timestamp: p.timestamp,
        };
      })
      .filter((p) => p.imageUrl);
  } catch {
    return [];
  }
}
