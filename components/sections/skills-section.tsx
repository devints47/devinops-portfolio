"use client"
// This component is now TERMINAL MODE ONLY
import { TerminalWindow } from "../terminal/terminal-window"
import { TerminalPrompt } from "../terminal/terminal-prompt"
import { Folder } from "lucide-react"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"

const skillCategories = [
  {
    name: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Javascript", "Tailwind/TSS", "Jinja2", "HTML5 & CSS3"],
    level: 90,
  },
  {
    name: "backend",
    skills: ["Django", "Flask", "FastAPI", "Node.js", "Typescript", "Java (Spring Boot)", "RESTful APIs", "PostgreSQL, MySQL, MongoDB"],
    level: 95,
  },
  {
    name: "devops",
    skills: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda, ECS)", "CI/CD", "Prometheus", "Grafana", "GitHub Actions"],
    level: 85,
  },
  {
    name: "scripting",
    skills: ["Python", "Bash", "PowerShell", "Selenium", "Playwright"],
    level: 90,
  },
  {
    name: "tools",
    skills: ["Git", "GitHub/GitLab/Bitbucket", "Linux", "Windows"," OSX", "Postman", "Agile Methodologies (Scrum, Kanban)", "JIRA & Confluence", "Slack", "Zoom", "O365"],
    level: 100,
  },
  {
    name: "ai",
    skills: ["Prompt Engineering", "MCPs", "Vector Databases", "OpenAI Platform", "Claude-CLI", "LLM related APIs", "AI Agents"],
    level: 90,
  },
]

export function SkillsSection() {
  return (
    <section 
      id="skills" 
      className="py-20 px-4 bg-terminal-background/60 relative"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Devin Singh's Technical Skills"
    >
      <meta itemProp="name" content="Devin Singh's Technical Skills" />
      <meta itemProp="description" content="Full-Stack and DevOps skills of Devin Singh, including frontend, backend, DevOps, scripting and tools expertise" />
      
      <FloatingCodeSnippet
        code={`// devinops-skills.json
{
  "frontend": ["React", "Tailwind", "TypeScript"],
  "backend": ["Node.js", "Flask", "Next.js"],
  "devops": ["Docker", "Kubernetes", "AWS"]
}`}
        top="10%"
        left="5%"
      />
      <FloatingCodeSnippet
        code={`// Learning new tech at DevinOps...
async function learn(skill) {
  while(notMastered(skill)) {
    await practice(skill);
  }
  return "New skill acquired!";
}`}
        bottom="15%"
        right="7%"
        animationDelay="1.5s"
      />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center font-mono text-terminal-accent">
          <span className="text-terminal-accent">$</span>{" "}
          <span className="text-terminal-foreground">ls -la skills/</span>
          <span className="sr-only">Devin Singh's Skills</span>
        </h2>

        <TerminalWindow title="skills" className="mx-auto">
          <div className="space-y-4">
            <TerminalPrompt>./list_skills --all --verbose</TerminalPrompt>
            <div className="terminal-output pl-2">
              <div className="text-sm text-terminal-muted mb-2">total 5 directories, 34 files</div>
              <div className="space-y-4">
                {skillCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="group border border-transparent hover:border-terminal-accent/30 p-3 rounded-md transition-all duration-300"
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/ItemList"
                  >
                    <meta itemProp="position" content={`${index + 1}`} />
                    <meta itemProp="name" content={`${category.name} Skills - Devin Singh`} />
                    
                    <div className="flex items-center gap-2 text-terminal-accent group-hover:animate-glow">
                      <Folder className="h-5 w-5" aria-hidden="true" />
                      <span className="font-mono" itemProp="description">drwxr-xr-x {category.name}/</span>
                    </div>
                    <div className="mt-2 pl-6 flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className="text-sm bg-terminal-background border border-terminal-accent/30 px-2 py-1 rounded-md hover:bg-terminal-accent/10 transition-colors"
                          itemScope
                          itemProp="itemListElement"
                          itemType="https://schema.org/ListItem"
                        >
                          <meta itemProp="position" content={`${skillIndex + 1}`} />
                          <span itemProp="name">{skill}</span>
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pl-6">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-terminal-accent rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${category.level}%` }}
                          aria-label={`${category.name} proficiency ${category.level}%`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
