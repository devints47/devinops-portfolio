import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devinops.me'
  const lastModified = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // We're not including fragment identifiers since search engines 
    // treat them as part of the same page as the base URL
  ]
} 