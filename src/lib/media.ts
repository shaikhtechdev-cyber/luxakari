// Maps the original public/ paths ("/images/logo.png", "/videos/hero.mp4")
// to the matching asset on Cloudinary (uploaded by scripts/upload-media.mjs).
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "df5umo2bu";

export function media(path: string): string {
  const clean = path.replace(/^\/+/, "");
  const isVideo = clean.startsWith("videos/");
  // Videos are uploaded pre-encoded for the web, so they are served as-is: an
  // on-the-fly Cloudinary video transform makes the first visitor wait while a
  // long video is re-processed.
  if (isVideo) return `https://res.cloudinary.com/${CLOUD}/video/upload/luxakari/${clean}`;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/luxakari/${clean}`;
}
