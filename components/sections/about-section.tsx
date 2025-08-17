"use client"
// This component is now TERMINAL MODE ONLY
import { TerminalWindow } from "../terminal/terminal-window"
import { TerminalPrompt } from "../terminal/terminal-prompt"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"

export function AboutSection() {
  const aboutContent = (
    <>
      <p className="mb-4">
        I'm a Full-Stack Engineer and DevOps Specialist with 10+ years of experience building, deploying, and scaling
        digital solutions at <span className="text-terminal-accent">DevinOps</span>.
      </p>
      <p className="mb-4">
        With a Bachelor's degree in Computer Engineering, I've developed a deep understanding of both software and
        hardware systems, allowing me to create efficient, scalable applications and infrastructure.
      </p>
      <p>
        Throughout my career, I've worked with startups and enterprise companies to modernize their tech stacks,
        implement CI/CD pipelines, and build cloud-native applications that deliver exceptional user experiences.
      </p>
    </>
  )

  return (
    <section 
      id="about" 
      className="py-20 px-4 bg-terminal-background/60 relative"
      itemScope
      itemType="https://schema.org/Person"
      aria-label="About Devin Singh - Software Engineer & DevOps Specialist"
    >
      <meta itemProp="name" content="Devin Singh" />
      <meta itemProp="jobTitle" content="Full-Stack Engineer & DevOps Specialist" />
      <meta itemProp="description" content="Software engineer with 10+ years of experience in full-stack development and DevOps, specializing in cloud architecture and scalable solutions." />
      
      <FloatingCodeSnippet
        code={`// about-devin-singh.md
---
name: Devin Singh
title: Full-Stack Engineer & DevOps Specialist
experience: 10+ Years
company: DevinOps
---`}
        top="15%"
        right="8%"
        animationDelay="0.5s"
      />
      <FloatingCodeSnippet
        code={`// Core Philosophy at DevinOps
const principles = ["Scalability", "Efficiency", "User-centric"];
const skills = ["Full-Stack", "DevOps", "Cloud"];`}
        bottom="10%"
        left="10%"
        animationDelay="2.5s"
      />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center font-mono text-terminal-accent">
          <span className="text-terminal-accent">$</span>{" "}
          <span className="text-terminal-foreground">cat about.txt</span>
          <span className="sr-only">About Devin Singh</span>
        </h2>

        <TerminalWindow title="about.txt" className="mx-auto">
          <div className="space-y-4">
            <TerminalPrompt>./display_info --section about</TerminalPrompt>
            <div className="terminal-output space-y-4 pl-2" itemProp="knowsAbout">
              {aboutContent}
              <div className="mt-8 border-t border-terminal-accent/30 pt-4">
                <div className="mt-4" itemScope itemType="https://schema.org/EducationalOrganization">
                  <p className="text-terminal-accent">Education:</p>
                  <div className="ml-4" itemProp="alumniOf">
                    <p>• <span itemProp="degree">Bachelor of Science in Computer Engineering</span></p>
                    <p>• Multiple certifications in <span className="text-terminal-accent">cloud technologies</span> and <span className="text-terminal-accent">DevOps practices</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
