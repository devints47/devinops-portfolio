"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Lightbulb, Users } from "lucide-react"

export function AboutProfessionalSection() {
  const coreStrengths = [
    {
      icon: <Briefcase className="h-6 w-6 text-professional-indigo-500" />,
      title: "10+ Years of Professional Experience",
      description: "Proven track record in delivering complex full-stack and DevOps solutions.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-professional-purple-500" />,
      title: "Innovative Problem-Solver",
      description: "Expertise in modernizing tech stacks and architecting scalable systems.",
    },
    {
      icon: <Users className="h-6 w-6 text-professional-fuchsia-500" />,
      title: "Collaborative Leader",
      description: "Experienced in guiding teams and fostering a culture of technical excellence.",
    },
  ]

  return (
    <section
      id="about-professional"
      className="professional-about py-20 px-4 bg-gradient-to-b from-professional-slate-900 via-white/15 to-professional-slate-700 text-professional-slate-200"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="professional-heading text-4xl font-bold mb-4 text-professional-slate-200">About <span itemProp="name">Devin Singh</span></h2>
          <p className="text-lg text-professional-slate-400 max-w-2xl mx-auto" itemProp="description">
            A seasoned Full-Stack Engineer and DevOps Specialist under the umbrella of <span className="text-professional-slate-200">DevinOps</span>, dedicated to crafting high-performance, scalable
            digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-professional-slate-200 border-l-4 border-professional-purple-500 pl-4">
              My Journey & Philosophy
            </h3>
            <div className="space-y-4 text-professional-slate-300" itemProp="knowsAbout">
              <p>
                With over a decade in the tech industry, I've honed my skills in bridging the gap between software
                development and operational excellence. My background in Computer Engineering provides a solid
                foundation for understanding complex systems from the ground up.
              </p>
              <p>
                As the founder of <strong className="text-professional-slate-200">DevinOps</strong>, I thrive on transforming challenges into opportunities, whether it's architecting cloud-native
                applications, streamlining CI/CD pipelines, or optimizing system performance. My approach is always
                user-centric, focusing on delivering solutions that are not only technically sound but also provide
                tangible business value.
              </p>
              <p>
                Passionate about continuous learning and improvement, I stay at the forefront of emerging technologies
                to ensure the solutions I build are future-proof and cutting-edge. My expertise spans <span className="text-professional-slate-200">full-stack development</span>, 
                <span className="text-professional-slate-200"> cloud architecture</span>, and <span className="text-professional-slate-200">DevOps practices</span>.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {coreStrengths.map((strength, index) => (
              <Card
                key={index}
                className="professional-card bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600 hover:shadow-professional-purple-500/20 transition-shadow duration-300"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  {strength.icon}
                  <CardTitle className="text-xl text-professional-slate-200">{strength.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-professional-slate-400">{strength.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="professional-card bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600 p-8">
          <div className="flex items-center gap-4 mb-4">
            <GraduationCap className="h-8 w-8 text-professional-indigo-500" />
            <h3 className="text-2xl font-semibold text-professional-slate-200">Education & Certifications</h3>
          </div>
          <ul className="space-y-2 text-professional-slate-300 list-disc list-inside" itemProp="hasCredential">
            <li>
              Bachelor of Science in Computer Engineering -{" "}
              <span className="text-professional-slate-400">University of Central Florida</span>
            </li>
            <li>Active Clearance</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
