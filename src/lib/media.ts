// Maps the original public/ paths ("/images/logo.png", "/videos/hero.mp4")
// to the matching asset on Cloudinary (uploaded by scripts/upload-media.mjs).
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "df5umo2bu";

export function media(path: string): string {
  const clean = path.replace(/^\/+/, "");
  const isVideo = clean.startsWith("videos/");
  const transform = isVideo ? "q_auto" : "f_auto,q_auto";
  return `https://res.cloudinary.com/${CLOUD}/${isVideo ? "video" : "image"}/upload/${transform}/luxakari/${clean}`;
}
