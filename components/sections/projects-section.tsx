"use client"
import { TerminalWindow } from "../terminal/terminal-window"
import { TerminalPrompt } from "../terminal/terminal-prompt"
import { ExternalLink, Github, Globe } from "lucide-react"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"

const projects = [
  {
    title: "VinylVerdict.FM",
    description:
      "A music analysis platform that allows users to authenticate with Spotify using OAuth and have their music parsed and analyzed by different AI personalities. The user is able to hold a mirror to their own music choices allow them to reflect and gain insight about themselves, based on whichever timeline they choose.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind/TSS", "OpenGraph-Image", "Spotify API", "OpenAI API"],
    githubUrl: "https://github.com/devints47/vinylverdict",
    liveUrl: "https://vinylverdict.fm",
  },
  {
    title: "Bloom-Solutions",
    description:
      "A company I co-founded that offers software development, SEO, and digital marketing services to clients. We focus on building digital products and business solutions that help our clients grow their business. From top to bottom, we offer a full suite of digital services to our clients.",
    technologies: ["Next.js", "Typescript", "Tailwind/TSS", "Hubspot", "Analytics", "Google Business", "SEO", "Web Integrations", "Web Hosting"],
    githubUrl: "https://github.com/Bloom-Solutions-FL",
    liveUrl: "https://bloomsolutionsfl.com",
  },
  {
    title: "So-Found-It",
    description:
      "An application that allows users to seamlessly create and manage communities and events, either through the web app or through SMS. The core concept is to reduce the friction of downloading or visiting a web application to manage or get updates about their community events via SMS.",
    technologies: ["React", "Next.js", "TypeScript",, "PostgreSQL", "Redis", "Prisma", "Twilio API", "Multi-modal Authentication", "React Query"],
    githubUrl: "https://github.com/So-Found-It",
    liveUrl: "https://www.sofoundit.com/about",
  },
]

export function ProjectsSection() {
  return (
    <section 
      id="projects" 
      className="py-20 px-4 bg-terminal-background/60 relative"
      itemScope
      itemType="https://schema.org/CollectionPage"
      aria-label="Software Engineering Projects by Devin Singh and DevinOps"
    >
      <meta itemProp="name" content="Devin Singh's and DevinOps' Software Engineering Projects" />
      <meta itemProp="description" content="Portfolio of software engineering projects by Devin Singh at DevinOps, showcasing full-stack, DevOps, and cloud architecture expertise" />
      
      <FloatingCodeSnippet
        code={`// devinops-project-pipeline.sh
git clone $REPO_URL
cd $PROJECT_NAME
npm install && npm run build
docker build -t $IMAGE_NAME .`}
        top="5%"
        right="3%"
        animationDelay="1s"
      />
      <FloatingCodeSnippet
        code={`// devin-singh-featured-project.js
class Project extends DevinOpsFramework {
  constructor(name, tech) {
    super();
    this.author = "Devin Singh";
    this.name = name;
    this.technologies = tech;
  }
}`}
        bottom="5%"
        left="3%"
        animationDelay="3s"
      />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center font-mono text-terminal-accent">
          <span className="text-terminal-accent">$</span>{" "}
          <span className="text-terminal-foreground">find ./projects -type f -name "*.awesome"</span>
          <span className="sr-only">Devin Singh's Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <TerminalWindow 
              key={project.title} 
              title={project.title.toLowerCase()}
            >
              <div 
                className="mb-2"
                itemScope
                itemType="https://schema.org/SoftwareSourceCode"
                itemProp="hasPart"
              >
                <meta itemProp="name" content={project.title} />
                <meta itemProp="author" content="Devin Singh" />
                <meta itemProp="programmingLanguage" content={project.technologies.join(", ")} />
                <meta itemProp="codeRepository" content={project.githubUrl} />
                
                <TerminalPrompt>./run_project {project.title.toLowerCase()}</TerminalPrompt>
                <div className="terminal-output pl-2">
                  <p className="text-terminal-accent mb-2">[INFO] Initializing {project.title}...</p>
                  <p className="mb-4 text-sm h-[11rem] overflow-hidden" itemProp="description">{project.description}</p>
                  <p className="text-terminal-accent mb-2">[INFO] Tech stack:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-terminal-background border border-terminal-accent/30 px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-terminal-muted mt-4">
                    <TerminalPrompt>git clone {project.githubUrl.split("https://")[1]}</TerminalPrompt>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline flex items-center gap-1 text-sm"
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>Source</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline flex items-center gap-1 text-sm"
                      aria-label={`View live demo of ${project.title}`}
                      itemProp="url"
                    >
                      <Globe className="h-4 w-4" aria-hidden="true" />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          ))}
        </div>
      </div>
    </section>
  )
}
