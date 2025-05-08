"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const skillsData = {
  frontend: [
    { name: "React", level: "Intermediate", years: 3, icon: "⚛️" },
    { name: "JavaScript", level: "Expert", years: 4, icon: "🟨" },
    { name: "TypeScript", level: "Intermediate", years: 2, icon: "🔷" },
    { name: "HTML/CSS", level: "Expert", years: 4, icon: "🌐" },
    { name: "Tailwind CSS", level: "Intermediate", years: 2, icon: "🎨" },
    { name: "Next.js", level: "Intermediate", years: 1, icon: "▲" },
    { name: "Three.js", level: "Intermediate", years: 1, icon: "🧊" },
    { name: "GSAP", level: "Intermediate", years: 1, icon: "🎭" },
  ],
  backend: [
    { name: "Node.js", level: "Intermediate", years: 2, icon: "🟢" },
    { name: "Express", level: "Intermediate", years: 2, icon: "🚂" },
    { name: "MongoDB", level: "Intermediate", years: 3, icon: "🍃" },
    { name: "REST API", level: "Expert", years: 4, icon: "🔄" },
  ],
  tools: [
    { name: "Git/Github", level: "Expert", years: 3, icon: "🔄" },
    { name: "Docker", level: "Intermediate", years: 2, icon: "🐳" },
    { name: "AWS", level: "Intermediate", years: 3, icon: "☁️" },
    { name: "Vercel", level: "Intermediate", years: 3, icon: "▲" },
    { name: "Figma", level: "Intermediate", years: 3, icon: "🎨" },
    { name: "Supabase", level: "Intermediate", years: 2, icon: "⚡" },
    { name: "Webpack", level: "Intermediate", years: 4, icon: "📦" },
    { name: "Vite", level: "Intermediate", years: 2, icon: "⚡" },
  ],
}

export default function SkillsSection() {
  return (
    <Tabs defaultValue="frontend" className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
        <TabsTrigger value="frontend">Frontend</TabsTrigger>
        <TabsTrigger value="backend">Backend</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
      </TabsList>

      <TabsContent value="frontend" className="mt-8">
        <SkillGrid skills={skillsData.frontend} />
      </TabsContent>

      <TabsContent value="backend" className="mt-8">
        <SkillGrid skills={skillsData.backend} />
      </TabsContent>

      <TabsContent value="tools" className="mt-8">
        <SkillGrid skills={skillsData.tools} />
      </TabsContent>
    </Tabs>
  )
}

function SkillGrid({ skills }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} index={index} />
      ))}
    </div>
  )
}

function SkillCard({ skill, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">{skill.icon}</div>
          <h3 className="font-bold mb-1">{skill.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{skill.level}</p>
          <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 inline-block">
            {skill.years} {skill.years === 1 ? "year" : "years"}
          </div>

          {isHovered && (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="h-1 bg-gradient-to-r from-[#0f0f0f] to-[#f5f5f5] mt-4 origin-left" />
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
