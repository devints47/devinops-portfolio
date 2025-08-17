"use client"
// This component is now TERMINAL MODE ONLY
import { TerminalWindow } from "../terminal/terminal-window"
import { TerminalPrompt } from "../terminal/terminal-prompt"
import { Button } from "../ui/button"
import { Download } from "lucide-react"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"
import React from "react"

const experience = [
  {
    title: "Software Design Engineer",
    company: "Cole Engineering Services, Inc.",
    location: "Orlando",
    period: "2023 - Present",
    description: [
      "Prototyped, designed, and lead the development of a modular monitoring and reporting web app to generate system health reports, used internally and by the military",
      "Refactored every Grafana dashboard used by the IT team to take broken and legacy dashboards and bring the total number of working dashboards from ~20% to 100%",
      "Collaborated across multiple teams to host all of the company's internal applications on a Kubernetes cluster, including a custom CI/CD pipeline to deploy, manage, and monitor the applications",
      "Developed an application to simulate a hospital's IT infrastructure, allowing the client to pen test their network and security infrastructure on demand",
    ],
  },
  {
    title: "Applications Developer",
    company: "K16 Solutions",
    location: "Remote",
    period: "2022 - 2023",
    description: [
      "Developed and maintained a cloud-native application to migrate universities across the top five online course hosting platforms",
      "Responsible for the testing, validation, and monitoring required to migrate thousands of courses over a 4 month period for each project",
      "Undertook project to refactor Blackboard API endpoints and call wrappers through a major redesign, ensuring 100% parity during active course migrations",
      "Actively engaged with client representatives to gather feedback, address feature requests, and align sprint goals",
    ],
  },
  {
    title: "Software Engineer",
    company: "Dignitas Technologies",
    location: "Orlando",
    period: "2020 - 2022",
    description: [
      "Developed and maintained the codebase for the company's flagship program as a full stack developer, contributing to numerous build releases",
      "Acted as a key liaison between the software and test engineer teams, participating in build tests and driving improvements within my own team through personal feedback",
      "Collaborated effectively within agile, cross-functional teams to deliver key product features on schedule",
      "Coordinated across multiple teams and projects in a leadership role to successfully navigate the company's CMMI Process appraisal",
    ],
  },
  {
    title: "Web Developer",
    company: "Center for Distributed Learning (UCF)",
    location: "Orlando",
    period: "2015 - 2020",
    description: [
      "Project Lead for O365-Timesheets, a web application that utilizes Office 365's API to analyze calendar data and automate the population of timesheets for part-time employees across UCF",
      "Outcomes Dashboard, an application made to deliver grade data visualizations in a dashboard format to enhance the student experience for UCF's Department of Health Sciences",
      "Full Stack Developer for Talent Roundup, CDL's hiring and application management suite",
      "Delegated tasks through GitHub issues and Trello, conducting code reviews, and QA tested code implementation on projects where a leadership role was necessary",
      "Conducted course content accessibility workshops for faculty, teachers, and staff",
    ],
  },
  {
    title: "Freelance Web Developer",
    company: "Freelance",
    location: "Remote",
    period: "2014 - Present",
    description: [
      "Developed and maintained websites for clients, including e-commerce platforms, portfolio sites, and custom web applications",
    ],
  },
]
const education = [{ degree: "BSc Computer Engineering", school: "University of Central Florida", period: "2015 - 2020" }]
const certifications = ["Active Clearance"]

export function ResumeSection() {
  return (
    <section 
      id="resume" 
      className="py-20 px-4 bg-terminal-background/60 relative"
      itemScope
      itemType="https://schema.org/ProfilePage"
      aria-label="Devin Singh's Professional Resume"
    >
      <meta itemProp="name" content="Devin Singh's Professional Resume" />
      <meta itemProp="description" content="Professional resume of Devin Singh, Full-Stack Software Engineer and DevOps Specialist at DevinOps with 10+ years of experience" />
      
      <FloatingCodeSnippet
        code={`// devin-singh-experience.yaml
- company: Cole Engineering Services, Inc.
  role: Software Design Engineer
  achievements: ["Web Application Development", 
  "Kubernetes", "CI/CD Pipelines", 
  "Cloud Scripting & Automation"]`}
        top="12%"
        left="6%"
        animationDelay="0.8s"
      />
      <FloatingCodeSnippet
        code={`// devinops-education-certs.py
education = {"degree": "BSc Computer Engineering"}
certs = ["Kubernetes", "CKA", "Docker"]`}
        bottom="8%"
        right="4%"
        animationDelay="2.2s"
      />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center font-mono text-terminal-accent">
          <span className="text-terminal-accent">$</span>{" "}
          <span className="text-terminal-foreground">cat resume.md</span>
          <span className="sr-only">Devin Singh's Resume</span>
        </h2>
        <TerminalWindow title="resume.md" className="mx-auto">
          <div className="space-y-6">
            <TerminalPrompt>./parse_resume --format markdown</TerminalPrompt>
            <div className="terminal-output space-y-6 pl-2">
              <div className="border-b border-terminal-accent/30 pb-4">
                <div className="text-terminal-accent text-lg font-bold" itemProp="headline"># DEVIN SINGH</div>
                <div className="text-sm text-terminal-muted" itemProp="description">Full-Stack Software Engineer with a passion for creative problem solving</div>
              </div>
              <div itemScope itemType="https://schema.org/ItemList">
                <meta itemProp="name" content="Devin Singh's Work Experience" />
                <meta itemProp="itemListOrder" content="Descending" />
                
                <div className="text-terminal-accent font-bold mb-3">## Professional Experience</div>
                {experience.map((job, index) => (
                  <div 
                    key={index} 
                    className="mb-4 pl-2"
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/WorkPosition"
                  >
                    <meta itemProp="position" content={`${index + 1}`} />
                    
                    <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
                      <span className="text-green-400 font-semibold flex-1 min-w-0 pr-2" itemProp="jobTitle">{job.title}</span>
                      <span className="text-green-400 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm" itemProp="validThrough">
                        {job.period.includes("Present") ? 
                          job.period.split("Present").map((part, i, arr) => 
                            i === arr.length - 1 ? 
                              part : 
                              <React.Fragment key={i}>
                                {part}<span className="text-terminal-accent">Present</span>
                              </React.Fragment>
                          ) : 
                          job.period}
                      </span>
                    </div>
                    <div className="text-terminal-muted text-sm mb-2">@ <span itemProp="hiringOrganization">{job.company}</span></div>
                    <ul className="text-sm space-y-1 list-disc list-outside pl-2 md:pl-6 ml-0 md:ml-4" itemProp="responsibilities">
                      {job.description.map((item, i) => (
                        <li key={i} className="pl-1">
                          <span className="block -indent-0 md:-indent-5 ml-0 md:ml-5">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div itemScope itemType="https://schema.org/ItemList">
                <meta itemProp="name" content="Devin Singh's Education" />
                
                <div className="text-terminal-accent font-bold mb-3">## Education</div>
                {education.map((edu, index) => (
                  <div 
                    key={index} 
                    className="pl-2"
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/EducationalOccupationalCredential"
                  >
                    <meta itemProp="position" content={`${index + 1}`} />
                    
                    <div className="text-green-400 font-semibold">
                      <span itemProp="credentialCategory">{edu.degree}</span>{" "}
                      <span className="text-terminal-muted">
                        - <span itemProp="educationalInstitution">{edu.school}</span> (<span itemProp="validFrom">{edu.period}</span>)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div itemScope itemType="https://schema.org/ItemList">
                <meta itemProp="name" content="Devin Singh's Professional Certifications" />
                
                <div className="text-terminal-accent font-bold mb-3">## Certifications</div>
                <ul className="pl-2 md:pl-4 space-y-1 list-disc list-inside text-sm">
                  {certifications.map((cert, index) => (
                    <li 
                      key={index}
                      itemScope
                      itemProp="itemListElement"
                      itemType="https://schema.org/Credential"
                    >
                      <meta itemProp="position" content={`${index + 1}`} />
                      <span itemProp="name">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-terminal-accent/30">
                <TerminalPrompt>wget devin-resume.pdf</TerminalPrompt>
                <div className="mt-2 pl-4">
                  <Button
                    variant="outline"
                    className="border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-black"
                    asChild
                  >
                    <a
                      href="/Devin_Singh_Resume.pdf"
                      download="Devin_Singh_Resume.pdf"
                      aria-label="Download Devin Singh's complete resume as PDF"
                    >
                      <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                      Download Full Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
