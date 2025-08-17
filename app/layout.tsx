import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ViewModeProvider } from "@/components/view-mode-toggle" // Assuming this is the correct path
import { ModeApplicator } from "@/components/mode-applicator"
import { SeoEnhancer } from "@/components/seo-enhancer"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export const viewport: Viewport = {
  themeColor: '#8b5cf6',
}

export const metadata: Metadata = {
  title: "DevinOps - Devin Singh | Full-Stack Engineer & DevOps Specialist",
  description: "Devin Singh - 10+ years building, deploying, and scaling digital solutions. Expertise in full-stack development, DevOps, and cloud architecture. Portfolio of a software engineer based in San Francisco.",
  keywords: ["Devin Singh", "DevinOps", "software engineer", "full stack developer", "DevOps specialist", "web developer", "Devin Singh developer", "Devin Singh software engineer"],
  authors: [{ name: "Devin Singh" }],
  creator: "Devin Singh",
  publisher: "Devin Singh",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://devinops.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "DevinOps - Devin Singh | Full-Stack Engineer & DevOps Specialist",
    description: "Devin Singh - 10+ years building, deploying, and scaling digital solutions. Portfolio showcasing expertise in full-stack development and DevOps.",
    url: "https://devinops.com",
    siteName: "DevinOps - Devin Singh's Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://devinops.com/og-image.jpg", // Create this image for social sharing
        width: 1200,
        height: 630,
        alt: "Devin Singh - Full-Stack Engineer & DevOps Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevinOps - Devin Singh | Full-Stack Engineer & DevOps Specialist",
    description: "Devin Singh - 10+ years building, deploying, and scaling digital solutions. Portfolio showcasing expertise in full-stack development and DevOps.",
    images: ["https://devinops.com/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#8b5cf6',
      },
      {
        rel: 'manifest',
        url: '/manifest.json',
      },
    ],
  },
  appleWebApp: {
    title: 'DevinOps',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  applicationName: 'DevinOps',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Microsoft Tile Color */}
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-CQBQKM7BG0" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CQBQKM7BG0');
          `}
        </Script>
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Devin Singh",
            "url": "https://devinops.com",
            "image": "https://devinops.com/profile-image.jpg",
            "jobTitle": "Full-Stack Engineer & DevOps Specialist",
            "worksFor": {
              "@type": "Organization",
              "name": "DevinOps"
            },
            "sameAs": [
              "https://github.com/devin",
              "https://linkedin.com/in/devin"
            ],
            "description": "10+ years of experience building, deploying, and scaling digital solutions.",
            "knowsAbout": ["Full-Stack Development", "DevOps", "Cloud Architecture", "Web Development", "Automation"]
          })
        }} />
        <Script id="json-ld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "@id": "https://devinops.com/#devin-singh",
                "name": "Devin Singh",
                "jobTitle": "Full-Stack Engineer & DevOps Specialist",
                "description": "Software engineer with 10+ years of experience in full-stack development and DevOps, specializing in cloud architecture and scalable solutions.",
                "url": "https://devinops.com",
                "sameAs": [
                  "https://linkedin.com/in/devin",
                  "https://github.com/devin"
                ],
                "email": "hello@devinops.com",
                "worksFor": {
                  "@type": "Organization",
                  "name": "DevinOps"
                },
                "knowsAbout": [
                  "Full-Stack Development",
                  "DevOps Engineering",
                  "Cloud Architecture",
                  "Kubernetes",
                  "React",
                  "Node.js",
                  "TypeScript",
                  "AWS",
                  "Docker",
                  "CI/CD"
                ],
                "hasOccupation": {
                  "@type": "Occupation",
                  "name": "Software Engineer",
                  "occupationLocation": {
                    "@type": "City",
                    "name": "San Francisco"
                  },
                  "skills": "Full-Stack Development, DevOps, Cloud Architecture, Kubernetes, React, Node.js"
                }
              },
              "mainContentOfPage": {
                "@type": "WebPageElement",
                "isPartOf": {
                  "@id": "https://devinops.com/#devin-singh"
                },
                "hasPart": [
                  {
                    "@type": "WebPageElement",
                    "name": "About",
                    "description": "About Devin Singh, Full-Stack Engineer and DevOps Specialist",
                    "url": "https://devinops.com/#about"
                  },
                  {
                    "@type": "WebPageElement",
                    "name": "Skills",
                    "description": "Technical skills of Devin Singh including frontend, backend, DevOps, and cloud technologies",
                    "url": "https://devinops.com/#skills"
                  },
                  {
                    "@type": "WebPageElement",
                    "name": "Projects",
                    "description": "Software engineering projects by Devin Singh showcasing full-stack and DevOps expertise",
                    "url": "https://devinops.com/#projects"
                  },
                  {
                    "@type": "WebPageElement",
                    "name": "Resume",
                    "description": "Professional resume of Devin Singh with work experience and qualifications",
                    "url": "https://devinops.com/#resume"
                  },
                  {
                    "@type": "WebPageElement",
                    "name": "Contact",
                    "description": "Contact information for Devin Singh",
                    "url": "https://devinops.com/#contact"
                  }
                ]
              }
            }
          `}
        </Script>
      </head>
      {/* Default body classes will be for terminal mode. ModeApplicator will adjust. */}
      <body>
        <ViewModeProvider>
          <ModeApplicator>
            {children}
          </ModeApplicator>
          <SeoEnhancer />
          <Analytics />
          <SpeedInsights />
        </ViewModeProvider>
      </body>
    </html>
  )
}
