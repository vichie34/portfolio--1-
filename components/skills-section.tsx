"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Skill {
  name: string
  level: string
  years: number
  image: string // Can be emoji or image URL
}

interface SkillGridProps {
  skills: Skill[]
}

interface SkillCardProps {
  skill: Skill
  index: number
}

const skillsData = {
  frontend: [
    { name: "React", level: "Intermediate", years: 3, image: "/images/react.svg" },
    { name: "JavaScript", level: "Expert", years: 4, image: "/images/javascript.svg" },
    { name: "TypeScript", level: "Intermediate", years: 2, image: "/images/typescript.svg" },
    { name: "HTML/CSS", level: "Expert", years: 4, image: "/images/html5 (1).svg" },
    { name: "Tailwind CSS", level: "Intermediate", years: 2, image: "/images/tailwindcss.svg" },
    { name: "Next.js", level: "Intermediate", years: 1, image: "/images/nextdotjs.svg" },
    { name: "Three.js", level: "Intermediate", years: 1, image: "/images/threedotjs.svg" },
    { name: "GSAP", level: "Intermediate", years: 1, image: "/images/gsap.svg" },
  ],
  backend: [
    { name: "Node.js", level: "Intermediate", years: 2, image: "/images/nodedotjs.svg" },
    { name: "Express", level: "Intermediate", years: 2, image: "/images/express.svg" },
    { name: "MongoDB", level: "Intermediate", years: 3, image: "/images/mongodb.svg" },
    { name: "REST API", level: "Expert", years: 4, image: "/images/api.svg" },
  ],
  tools: [
    { name: "Git/Github", level: "Expert", years: 3, image: "/images/git.svg" },
    { name: "Docker", level: "Intermediate", years: 2, image: "/images/docker.svg" },
    { name: "AWS", level: "Intermediate", years: 3, image: "/images/aws.svg" },
    { name: "Vercel", level: "Intermediate", years: 3, image: "/images/vercel.svg" },
    { name: "Figma", level: "Intermediate", years: 3, image: "/images/figma.svg" },
    { name: "Supabase", level: "Intermediate", years: 2, image: "/images/supabase.svg" },
    { name: "Webpack", level: "Intermediate", years: 4, image: "/images/webpack.svg" },
    { name: "Vite", level: "Intermediate", years: 2, image: "/images/vite.svg" },
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

function SkillGrid({ skills }: SkillGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} index={index} />
      ))}
    </div>
  )
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Check if the image is a URL (starts with http or /) or an emoji
  const isImageUrl = skill.image.startsWith('http') || skill.image.startsWith('/')

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
          <div className="text-4xl mb-4 flex justify-center items-center h-12">
            {isImageUrl ? (
              <Image
                src={skill.image}
                alt={skill.name}
                width={48}
                height={48}
                className="object-contain"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : (
              <span className="text-4xl">{skill.image}</span>
            )}
          </div>
          <h3 className="font-bold mb-1">{skill.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{skill.level}</p>
          <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 inline-block">
            {skill.years} {skill.years === 1 ? "year" : "years"}
          </div>

          {isHovered && (
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              className="h-1 bg-gradient-to-r from-[#0f0f0f] to-[#f5f5f5] mt-4 origin-left" 
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
