"use client"

import { Header } from "@/components/header"
import { HeroSectionWrapper } from "@/components/sections/hero-section-wrapper"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { GitHubSection } from "@/components/sections/github-section"
import { ResumeSection } from "@/components/sections/resume-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

import { MatrixBackground } from "@/components/terminal/matrix-background"
import { KeyboardNavigationHandler } from "@/components/keyboard-navigation-handler"

export default function Home() {
  return (
    <>
      <KeyboardNavigationHandler />
      <MatrixBackground />
      <Header />
      <main>
        <HeroSectionWrapper />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <GitHubSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
