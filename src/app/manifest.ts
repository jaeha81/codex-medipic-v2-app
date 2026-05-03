import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "medipic Online Care",
    short_name: "medipic",
    description: "Online care intake, booking, and follow-up experience.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/images/medipic/logo-main.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/medipic/logo-main.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
