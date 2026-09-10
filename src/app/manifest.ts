import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Praguery Academy",
    short_name: "Academy",
    description: "The Praguery employee training — role sign-in for shared iPads.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3ECE3",
    theme_color: "#161411",
    orientation: "any",
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
