"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Eye, Globe } from "lucide-react"
import Image from "next/image"

const professionalProjects = [
  {
    title: "VinylVerdict.FM",
    description:
    "A music analysis platform that allows users to authenticate with Spotify using OAuth and have their music parsed and analyzed by different AI personalities. Users can hold a mirror to their own music listening history and allow them to reflect and gain insight about themselves for whichever timeline they choose.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind/TSS", "REST API", "OpenGraph-Image", "Spotify API", "OpenAI API"],
    githubUrl: "https://github.com/devints47/vinylverdict",
    liveUrl: "https://vinylverdict.fm",
    imageUrl: "/vinylverdict.png",
  },
  {
    title: "Bloom Solutions",
    description:
      "A company I co-founded that offers software development, SEO, and digital marketing services to clients. We focus on building digital products and business solutions that help our clients grow their business. From top to bottom, we offer a full suite of digital services to our clients.",
    technologies: ["Next.js", "Typescript", "Tailwind/TSS", "Hubspot", "Various Analytics", "Google Business", "SEO", "Various Web Integrations", "Web Hosting"],
    githubUrl: "https://github.com/Bloom-Solutions-FL",
    liveUrl: "https://bloomsolutionsfl.com",
    imageUrl: "/bloomsolutions.png",
  },
  {
    title: "So-Found-It",
    description:
      "An application that allows users to seamlessly create and manage communities and events, either through the web app or through SMS. The core concept is to reduce the friction of downloading or visiting a web application to manage or get updates about their community events via SMS.",
    technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Prisma", "Twilio API", "Multi-modal Authentication", "React Query"],
    githubUrl: "https://github.com/So-Found-It",
    liveUrl: "https://www.sofoundit.com/about",
    imageUrl: "/foundit.png",
  },
]

export function ProjectsProfessionalSection() {
  return (
    <section
      id="projects-professional"
      className="professional-projects py-20 px-4 bg-gradient-to-b from-professional-slate-900 via-white/15 to-professional-slate-800 text-professional-slate-200"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <meta itemProp="name" content="Devin Singh's Software Engineering Projects" />
      <meta itemProp="description" content="A portfolio of software engineering projects by Devin Singh showcasing full-stack, DevOps, and cloud architecture expertise" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="professional-heading text-4xl font-bold mb-4 text-professional-slate-200">
            Featured Projects
          </h2>
          <p className="text-lg text-professional-slate-400 max-w-2xl mx-auto">
            A selection of projects showcasing my ability to deliver impactful and innovative <span className="text-professional-slate-200">software engineering</span> solutions through <span className="text-professional-slate-200">DevinOps</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalProjects.map((project, index) => (
            <Card
              key={project.title}
              className="professional-project-card professional-card bg-professional-slate-800/80 backdrop-blur-sm border-professional-slate-600 flex flex-col overflow-hidden hover:shadow-professional-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
              itemScope
              itemType="https://schema.org/SoftwareSourceCode"
              itemProp="hasPart"
            >
              <meta itemProp="codeRepository" content={project.githubUrl} />
              <meta itemProp="programmingLanguage" content={project.technologies.join(", ")} />
              <meta itemProp="author" content="Devin Singh" />

              <div className="relative w-full h-52">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={`${project.title} - Project by Devin Singh`}
                  fill={true}
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-500 group-hover:scale-105"
                  itemProp="image"
                />
              </div>
              <CardHeader className="pt-6">
                <CardTitle className="text-xl text-professional-slate-200" itemProp="name">{project.title}</CardTitle>
                <CardDescription 
                  className="text-professional-slate-400 text-sm h-36 overflow-hidden" 
                  itemProp="abstract"
                >
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-xs text-professional-slate-500 mb-2 -mt-2 font-semibold">KEY TECHNOLOGIES:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="professional-tech-badge text-xs bg-professional-slate-700 text-professional-purple-400 md:text-white px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 bg-professional-slate-800/50 border-t border-professional-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="professional-project-btn border-professional-purple-500 text-professional-purple-400 hover:bg-professional-purple-500/10 hover:text-professional-purple-300"
                >
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    <Github className="h-4 w-4 mr-2" aria-hidden="true" />
                    Source
                  </a>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="professional-project-btn bg-professional-indigo-500 hover:bg-professional-indigo-500/90 text-white"
                >
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`Visit ${project.title} website`}
                    itemProp="url"
                  >
                    <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                    Visit Site
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
