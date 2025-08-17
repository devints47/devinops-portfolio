"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Code, Server, Cloud, Settings, Zap, Brain } from "lucide-react"
import type { Skill, SkillCategory, SkillLevel } from "./skill-types"

const professionalSkills: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: <Code className="h-6 w-6 text-professional-indigo-500" />,
    skills: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "Tailwind/TSS", level: "Advanced" },
      { name: "HTML5 & CSS3", level: "Expert" },
      { name: "Jinja2", level: "Advanced" },
    ],
  },
  {
    name: "Backend Development",
    icon: <Server className="h-6 w-6 text-professional-purple-500" />,
    skills: [
      { name: "Python (Django, Flask, FastAPI)", level: "Expert" },
      { name: "Node.js", level: "Expert" },
      { name: "Typescript", level: "Expert" },
      { name: "Java (Spring Boot)", level: "Intermediate" },
      { name: "RESTful APIs", level: "Expert" },
      { name: "PostgreSQL, MySQL, MongoDB", level: "Intermediate" },
      { name: "Postman", level: "Advanced" },
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: <Cloud className="h-6 w-6 text-professional-fuchsia-500" />,
    skills: [
      { name: "Docker", level: "Expert" },
      { name: "Kubernetes", level: "Advanced" },
      { name: "AWS (EC2, S3, Lambda, ECS)", level: "Advanced" },
      { name: "CI/CD (GitLab CI, GitHub Actions)", level: "Expert" },
      { name: "Prometheus, Grafana", level: "Expert" },
    ],
  },
  {
    name: "Scripting & Automation",
    icon: <Zap className="h-6 w-6 text-professional-indigo-500" />,
    skills: [
      { name: "Python Scripting", level: "Expert" },
      { name: "Bash Scripting", level: "Intermediate" },
      { name: "PowerShell", level: "Intermediate" },
      { name: "Selenium", level: "Expert" },
      { name: "Playwright", level: "Advanced" },
    ],
  },
  {
    name: "Tools & Technologies",
    icon: <Settings className="h-6 w-6 text-professional-purple-500" />,
    skills: [
      { name: "Git & GitHub/GitLab", level: "Expert" },
      { name: "Linux/Windows/OSX", level: "Expert" },
      { name: "Agile Methodologies (Scrum, Kanban)", level: "Expert" },
      { name: "JIRA & Confluence", level: "Expert" },
      { name: "Slack, Zoom, O365", level: "Expert" },
    ],
  },
  {
    name: "AI",
    icon: <Brain className="h-6 w-6 text-professional-purple-500" />,
    skills: [
      { name: "Prompt Engineering", level: "Expert" },
      { name: "MCPs", level: "Expert" },
      { name: "Vector Databases", level: "Intermediate" },
      { name: "OpenAI Platform", level: "Expert" },
      { name: "Claude-CLI", level: "Expert" },
      { name: "LLM related APIs", level: "Expert" },
      { name: "AI Agents", level: "Expert" },
    ],
  }
]

const SkillLevelIndicator = ({ level }: { level: SkillLevel }) => {
  const levelColor =
    level === "Expert"
      ? "bg-professional-indigo-500"
      : level === "Advanced"
        ? "bg-professional-purple-500"
        : level === "Intermediate"
          ? "bg-professional-blue-500"
          : "bg-professional-slate-500"
  return (
    <span
      className={`professional-skill-level text-xs font-semibold px-2 py-0.5 rounded-full text-white ${levelColor}`}
    >
      {level}
    </span>
  )
}

export function SkillsProfessionalSection() {
  return (
    <section
      id="skills-professional"
      className="professional-skills py-20 px-4 bg-gradient-to-br from-professional-slate-900 via-white/15 to-professional-slate-800 text-professional-slate-200"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="itemListOrder" content="Unordered" />
      <meta itemProp="name" content="Devin Singh's Technical Skills" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="professional-heading text-4xl font-bold mb-4 text-professional-slate-200">
            Technical Expertise of <span className="sr-only">Devin Singh</span>
          </h2>
          <p className="text-lg text-professional-slate-400 max-w-2xl mx-auto">
            A versatile skill set honed over years of building and deploying robust digital solutions as <span className="text-professional-slate-200">DevinOps</span>.
          </p>
        </div>

        <div className="professional-skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalSkills.map((category: SkillCategory, index: number) => (
            <Card
              key={category.name}
              className="professional-card bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600 flex flex-col"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="position" content={`${index + 1}`} />
              <meta itemProp="name" content={`${category.name} Skills - Devin Singh`} />
              
              <CardHeader className="flex flex-row items-center gap-3 pb-4">
                {category.icon}
                <CardTitle className="text-xl text-professional-slate-200">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3" itemProp="itemListElement" itemScope itemType="https://schema.org/ItemList">
                  {category.skills.map((skill: Skill, skillIndex: number) => (
                    <li 
                      key={skill.name} 
                      className="flex items-center justify-between text-sm"
                      itemScope
                      itemProp="itemListElement"
                      itemType="https://schema.org/ListItem"
                    >
                      <meta itemProp="position" content={`${skillIndex + 1}`} />
                      <span className="text-professional-slate-300 flex items-center" itemProp="name">
                        <CheckCircle className="h-4 w-4 mr-2 text-professional-purple-400" aria-hidden="true" />
                        {skill.name}
                      </span>
                      <SkillLevelIndicator level={skill.level} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
