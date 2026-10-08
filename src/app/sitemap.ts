import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  { path: "", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/cakes", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${siteUrl}${r.path}`, priority: r.priority }));
}
