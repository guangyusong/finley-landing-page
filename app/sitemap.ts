import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://garrisonco.ca"; // Canonical domain
  const now = new Date().toISOString();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/licenses`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
