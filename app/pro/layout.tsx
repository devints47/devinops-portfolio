import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Portfolio - Devin Singh | Full-Stack Engineer & DevOps Specialist",
  description: "Professional portfolio of Devin Singh - 10+ years building, deploying, and scaling digital solutions. Expert in full-stack development, DevOps, and cloud architecture.",
  keywords: ["Devin Singh professional", "DevinOps professional", "software engineer portfolio", "full stack developer", "DevOps specialist portfolio", "web developer resume"],
  alternates: {
    canonical: "/pro",
  },
  openGraph: {
    title: "Professional Portfolio - Devin Singh | Full-Stack Engineer & DevOps Specialist",
    description: "Professional portfolio of Devin Singh - Expert in full-stack development, DevOps, and cloud architecture with 10+ years of experience.",
    url: "https://devinops.me/pro",
    siteName: "DevinOps - Devin Singh's Professional Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "https://devinops.me/og-image-professional.jpg",
        width: 1200,
        height: 630,
        alt: "Devin Singh - Professional Portfolio - Full-Stack Engineer & DevOps Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Portfolio - Devin Singh | Full-Stack Engineer & DevOps Specialist",
    description: "Professional portfolio of Devin Singh - Expert in full-stack development, DevOps, and cloud architecture with 10+ years of experience.",
    images: ["https://devinops.me/og-image-professional.jpg"],
  },
}

export default function ProLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 