"use client"

import { useViewMode } from "./view-mode-toggle"
import Script from "next/script"
import { useEffect, useState } from "react"

export function SeoEnhancer() {
  const { mode } = useViewMode()
  const [currentMode, setCurrentMode] = useState<"terminal" | "professional" | null>(null)

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  if (!currentMode) return null

  
  // Generate structured data based on the current view mode
  const getStructuredData = () => {
    if (currentMode === "professional") {
      return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://devinops.me/#devin-singh-professional",
          "name": "Devin Singh",
          "jobTitle": "Full-Stack Engineer & DevOps Specialist",
          "description": "Software engineer with 10+ years of experience in full-stack development and DevOps, specializing in cloud architecture and scalable solutions.",
          "url": "https://devinops.me",
          "sameAs": [
            "https://linkedin.com/in/devin",
            "https://github.com/devin"
          ],
          "email": "hello@devinops.com",
          "worksFor": {
            "@type": "Organization",
            "name": "DevinOps"
          }
        },
        "mainContentOfPage": {
          "@type": "WebPageElement",
          "isPartOf": {
            "@id": "https://devinops.me/#devin-singh-professional"
          },
          "hasPart": [
            {
              "@type": "WebPageElement",
              "name": "About",
              "description": "About Devin Singh, Full-Stack Engineer and DevOps Specialist",
              "url": "https://devinops.me/#about-professional"
            },
            {
              "@type": "WebPageElement",
              "name": "Skills",
              "description": "Technical skills of Devin Singh including frontend, backend, DevOps, and cloud technologies",
              "url": "https://devinops.me/#skills-professional"
            },
            {
              "@type": "WebPageElement",
              "name": "Projects",
              "description": "Software engineering projects by Devin Singh showcasing full-stack and DevOps expertise",
              "url": "https://devinops.me/#projects-professional"
            },
            {
              "@type": "WebPageElement",
              "name": "Resume",
              "description": "Professional resume of Devin Singh with work experience and qualifications",
              "url": "https://devinops.me/#resume-professional"
            },
            {
              "@type": "WebPageElement",
              "name": "Contact",
              "description": "Contact information for Devin Singh",
              "url": "https://devinops.me/#contact-professional"
            }
          ]
        }
      }
    } else {
      // Terminal mode structured data
      return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://devinops.me/#devin-singh-terminal",
          "name": "Devin Singh",
          "jobTitle": "Full-Stack Engineer & DevOps Specialist",
          "description": "Software engineer with 10+ years of experience in full-stack development and DevOps, specializing in cloud architecture and scalable solutions.",
          "url": "https://devinops.me",
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
            "occupationalCategory": "15-1252",
            "skills": "Full-Stack Development, DevOps, Cloud Architecture, Kubernetes, React, Node.js"
          }
        },
        "mainContentOfPage": {
          "@type": "WebPageElement",
          "isPartOf": {
            "@id": "https://devinops.me/#devin-singh-terminal"
          },
          "hasPart": [
            {
              "@type": "WebPageElement",
              "name": "Hero",
              "description": "Terminal-style introduction to Devin Singh, Full-Stack Engineer and DevOps Specialist",
              "url": "https://devinops.me/#hero"
            },
            {
              "@type": "WebPageElement",
              "name": "About",
              "description": "About Devin Singh's background and expertise in software engineering and DevOps",
              "url": "https://devinops.me/#about"
            },
            {
              "@type": "WebPageElement",
              "name": "Skills",
              "description": "Technical skills of Devin Singh presented in a terminal-style interface",
              "url": "https://devinops.me/#skills"
            },
            {
              "@type": "WebPageElement",
              "name": "Projects",
              "description": "Software engineering projects by Devin Singh showcased in terminal windows",
              "url": "https://devinops.me/#projects"
            },
            {
              "@type": "WebPageElement",
              "name": "Contact",
              "description": "Contact information for Devin Singh with terminal-style form",
              "url": "https://devinops.me/#contact"
            }
          ]
        },
        "specialty": "Terminal-style portfolio showcasing software engineering and DevOps expertise"
      }
    }
  }

  const structuredData = getStructuredData()

  return (
    <Script id={`${currentMode}-json-ld`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(structuredData)}
    </Script>
  )
} 