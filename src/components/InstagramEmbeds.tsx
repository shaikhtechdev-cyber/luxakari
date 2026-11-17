"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_ID = "instagram-embed-js";

// Instagram's official post embed: each blockquote is swapped for an iframe by
// embed.js, which also sizes it to the post.
export default function InstagramEmbeds({ urls }: { urls: string[] }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (document.getElementById(SCRIPT_ID)) return;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(s);
  }, []);

  return (
    <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] lg:-mx-10 lg:px-10">
      <ul className="flex snap-x snap-mandatory items-start gap-5">
        {urls.map((url) => (
          <li key={url} className="w-[328px] shrink-0 snap-start">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`${url}?utm_source=ig_embed`}
              data-instgrm-version="14"
              style={{ margin: 0, minWidth: 326, maxWidth: 328, width: "100%", background: "#fff", border: 0 }}
            >
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex aspect-square items-center justify-center font-display text-[11px] uppercase tracking-[0.2em] text-maroon"
              >
                View on Instagram
              </a>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
