"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, MapPin, Building, Award, GraduationCap, Briefcase, CheckCircle } from "lucide-react"

const professionalExperience = [
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

const professionalEducation = [
  {
    degree: "Bachelor of Science in Computer Engineering",
    school: "University of Central Florida",
    location: "Orlando",
    period: "2015 - 2020",
  },
]

const professionalCertifications = [
  "Active Clearance"
]

export function ResumeProfessionalSection() {
  return (
    <section
      id="resume-professional"
      className="professional-resume py-20 px-4 
         bg-gradient-to-br from-professional-slate-900 via-slate-300/10 to-professional-slate-800 
         text-professional-slate-200"
      itemScope
      itemType="https://schema.org/ProfilePage"
    >
      <meta itemProp="name" content="Devin Singh's Professional Resume" />
      <meta itemProp="description" content="Professional resume of Devin Singh, Full-Stack Engineer and DevOps Specialist with 10+ years of experience" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="professional-heading text-4xl font-bold mb-4 text-professional-slate-200">
            Career & Qualifications of <span className="sr-only">Devin Singh</span>
          </h2>
          <p className="text-lg text-professional-slate-400 max-w-2xl mx-auto">
            A detailed overview of my professional journey, skills, and educational background as <span className="text-professional-slate-200">DevinOps</span>.
          </p>
        </div>

        <div className="space-y-12">
          {/* Experience Section */}
          <div itemScope itemType="https://schema.org/ItemList">
            <meta itemProp="name" content="Devin Singh's Work Experience" />
            <meta itemProp="itemListOrder" content="Descending" />
            
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-8 w-8 text-professional-indigo-500" aria-hidden="true" />
              <h3 className="text-3xl font-semibold text-professional-slate-200">Professional Experience</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[5px] before:top-[32px] before:h-[calc(100%-32px)] before:w-0.5 before:bg-professional-purple-500/30 pl-8">
              {professionalExperience.map((job, index) => (
                <Card
                  key={index}
                  className="professional-card bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600 relative before:absolute before:left-[-32px] before:top-8 before:h-3 before:w-3 before:rounded-full before:bg-professional-purple-500 before:ring-4 before:ring-professional-slate-800/90 before:z-10"
                  itemScope
                  itemProp="itemListElement"
                  itemType="https://schema.org/WorkPosition"
                >
                  <meta itemProp="position" content={`${index + 1}`} />
                  
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <CardTitle className="text-xl text-professional-slate-100" itemProp="jobTitle">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1 text-professional-purple-400">
                          <Building className="h-4 w-4" aria-hidden="true" />
                          <span itemProp="hiringOrganization">{job.company}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:items-end mt-2 sm:mt-0 text-sm text-professional-slate-400">
                        <div className="flex items-center gap-1" itemProp="validThrough">
                          <Calendar className="h-4 w-4" aria-hidden="true" /> {job.period}
                        </div>
                        <div className="flex items-center gap-1" itemProp="jobLocation">
                          <MapPin className="h-4 w-4" aria-hidden="true" /> {job.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-professional-slate-300 list-disc list-outside pl-6" itemProp="responsibilities">
                      {job.description.map((item, i) => (
                        <li key={i} className="pl-1">
                          <span className="block -indent-5 ml-5">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education & Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-professional-slate-700/50">
            <div itemScope itemType="https://schema.org/ItemList">
              <meta itemProp="name" content="Devin Singh's Education" />
              
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-8 w-8 text-professional-indigo-500" aria-hidden="true" />
                <h3 className="text-3xl font-semibold text-professional-slate-200">Education</h3>
              </div>
              {professionalEducation.map((edu, index) => (
                <Card
                  key={index}
                  className="professional-card bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600"
                  itemScope
                  itemProp="itemListElement"
                  itemType="https://schema.org/EducationalOccupationalCredential"
                >
                  <meta itemProp="position" content={`${index + 1}`} />
                  
                  <CardHeader>
                    <CardTitle className="text-xl text-professional-slate-100" itemProp="credentialCategory">{edu.degree}</CardTitle>
                    <CardDescription className="text-professional-purple-400">
                      <span itemProp="educationalInstitution">{edu.school}</span>, <span itemProp="educationalCredentialAwarded">{edu.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-professional-slate-300">
                    <div className="flex items-center gap-1 text-sm mb-1" itemProp="validFrom">
                      <Calendar className="h-4 w-4" aria-hidden="true" /> {edu.period}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div itemScope itemType="https://schema.org/ItemList">
              <meta itemProp="name" content="Devin Singh's Professional Certifications" />
              
              <div className="flex items-center gap-3 mb-8">
                <Award className="h-8 w-8 text-professional-indigo-500" aria-hidden="true" />
                <h3 className="text-3xl font-semibold text-professional-slate-200">Certifications</h3>
              </div>
              <Card className="professional-card bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600">
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-professional-slate-300">
                    {professionalCertifications.map((cert, index) => (
                      <li 
                        key={index} 
                        className="flex items-center gap-2" 
                        itemScope 
                        itemProp="itemListElement"
                        itemType="https://schema.org/Credential"
                      >
                        <meta itemProp="position" content={`${index + 1}`} />
                        <CheckCircle className="h-5 w-5 text-professional-purple-400 flex-shrink-0" aria-hidden="true" />
                        <span itemProp="name">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-professional-slate-700/50">
            <Button
              size="lg"
              className="bg-gradient-to-r from-professional-indigo-500 to-professional-purple-500 hover:from-professional-indigo-500/90 hover:to-professional-purple-500/90 text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
              asChild
            >
              <a
                href="/Devin_Singh_Resume.pdf"
                download="Devin_Singh_Resume.pdf"
                aria-label="Download Devin Singh's complete resume as PDF"
              >
                <Download className="h-5 w-5 mr-2" aria-hidden="true" />
                Download Full Resume (PDF)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
