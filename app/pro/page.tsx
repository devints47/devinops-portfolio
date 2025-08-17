"use client"

import { Header } from "@/components/header"
import { HeroProfessionalSection } from "@/components/sections/professional/hero-professional-section"
import { AboutProfessionalSection } from "@/components/sections/professional/about-professional-section"
import { SkillsProfessionalSection } from "@/components/sections/professional/skills-professional-section"
import { ProjectsProfessionalSection } from "@/components/sections/professional/projects-professional-section"
import { ResumeProfessionalSection } from "@/components/sections/professional/resume-professional-section"
import { GitHubContributionSection } from "@/components/sections/professional/github-contribution-section"
import { ContactProfessionalSection } from "@/components/sections/professional/contact-professional-section"
import { FooterProfessionalSection } from "@/components/sections/professional/footer-professional-section"

import { KeyboardNavigationHandler } from "@/components/keyboard-navigation-handler"
import { ProfessionalSectionSeparator } from "@/components/professional-section-separator"

export default function ProPage() {
  return (
    <>
      <KeyboardNavigationHandler />
      <Header />
      <main>
        <HeroProfessionalSection />
        
        <ProfessionalSectionSeparator />
        <AboutProfessionalSection />

        <ProfessionalSectionSeparator />
        <SkillsProfessionalSection />

        <ProfessionalSectionSeparator />
        <ProjectsProfessionalSection />

        <ProfessionalSectionSeparator />
        <ResumeProfessionalSection />

        <ProfessionalSectionSeparator />
        <GitHubContributionSection />

        <ProfessionalSectionSeparator />
        <ContactProfessionalSection />
      </main>
      <FooterProfessionalSection />
    </>
  )
} 