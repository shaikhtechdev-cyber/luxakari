import { Instagram, Play, ArrowUpRight } from "lucide-react";
import { FEATURED_POSTS, getInstagramPosts, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/instagram";
import InstagramEmbeds from "@/components/InstagramEmbeds";

// Server component: shows the latest posts from an automatic feed (cached for an
// hour); otherwise the hand-picked FEATURED_POSTS as Instagram embeds.
export default async function InstagramFeed() {
  const posts = await getInstagramPosts(8);

  return (
    <section id="instagram" className="relative bg-maroon py-20 text-cream lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-label font-display text-rosegold">Instagram</span>
            <h2 className="font-heading text-3xl font-medium leading-[1.15] text-cream sm:text-4xl lg:text-5xl">
              Life at Luxakari
            </h2>
            <div className="divider-gold mt-6 w-20" />
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-rosegold/60 px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-rosegold transition-colors hover:bg-rosegold hover:text-maroon"
          >
            <Instagram className="h-4 w-4" />
            Follow @{INSTAGRAM_HANDLE}
          </a>
        </div>

        {posts.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {posts.map((p) => (
              <li key={p.id}>
                <a
                  href={p.permalink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p.caption ? `Instagram post: ${p.caption.slice(0, 80)}` : "Instagram post"}
                  className="group relative block aspect-square overflow-hidden bg-maroon-raised"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- Instagram CDN URLs are signed and short-lived */}
                  <img
                    src={p.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.isVideo && (
                    <Play className="absolute right-3 top-3 h-5 w-5 fill-cream text-cream drop-shadow" aria-hidden />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-maroon/90 via-maroon/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="line-clamp-3 font-body text-xs leading-relaxed text-cream/90">{p.caption}</p>
                    <ArrowUpRight className="mt-2 h-4 w-4 text-rosegold" aria-hidden />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : FEATURED_POSTS.length > 0 ? (
          <InstagramEmbeds urls={FEATURED_POSTS} />
        ) : (
          <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-sand">
            Follow us on Instagram for a look inside our residences, Madinah moments and the latest from
            Luxakari Hospitality Group.
          </p>
        )}
      </div>
    </section>
  );
}
