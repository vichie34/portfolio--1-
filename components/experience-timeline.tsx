"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    company: "Coders Triangle",
    position: "Junior Frontend Developer",
    period: "2021 - 2023",
    description:
      "Created responsive web applications for various clients. Worked closely with designers to implement pixel-perfect UIs and smooth animations.",
    achievements: [
      "Developed 15+ client websites with responsive designs",
      "Implemented accessibility improvements across all projects",
      "Created a reusable component library reducing development time by 30%",
    ],
    logo: "/1745598617675.jpg?height=100&width=100",
  },
  {
    company: "Goodisoft Technologies",
    position: "Developer Intern",
    period: "2024 - 2025",
    description:
      "Developed and maintained multiple client projects using React, Node.js, and Git. Collaborated with design and product teams to deliver high-quality web applications.",
    achievements: [
      "Built a real-time dashboard that increased client efficiency by 35%",
      "Implemented authentication system with multi-factor authentication",
      "Optimized database queries resulting in 50% faster response times",
    ],
    logo: "/1745598639420.jpg?height=100&width=100",
  },
  {
    company: "Brooch Real Estate",
    position: "Frontend Engineer",
    period: "2025 - Present",
    description:
      "Led the development of the company's flagship product, improving performance by 40%. Mentored junior developers and implemented best practices for code quality.",
    achievements: [
      "Reduced load time by 60% through code optimization",
      "Implemented CI/CD pipeline reducing deployment time by 70%",
      "Led a team of 5 developers for a major product launch",
    ],
    logo: "/placeholder.svg?height=100&width=100",
  },
]

export default function ExperienceTimeline() {
  const timelineRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (timelineRef.current && isInView) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.5,
        },
      })

      timeline.to(".timeline-progress", {
        height: "100%",
        duration: 1,
        ease: "none",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={timelineRef}
        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-muted transform md:translate-x-[-50%] z-0"
      >
        <div className="timeline-progress w-full bg-primary" style={{ height: "0%" }}></div>
      </div>

      <div className="relative z-10">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} experience={exp} index={index} isLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ experience, index, isLeft }) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.2 })

  const containerClasses = `
    mb-12 flex flex-col md:flex-row items-center
    ${isLeft ? "md:flex-row-reverse" : ""}
  `

  const contentClasses = `
    w-full md:w-[calc(50%-40px)] 
    ${isLeft ? "md:text-right md:items-end" : ""}
  `

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={containerClasses}
    >
      <div className={contentClasses}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={experience.logo || "/placeholder.svg"}
                alt={experience.company}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{experience.company}</h3>
                <p className="text-muted-foreground">{experience.position}</p>
              </div>
            </div>

            <div className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full inline-block mb-4">
              {experience.period}
            </div>

            <p className="mb-4">{experience.description}</p>

            <div className="space-y-2">
              <h4 className="font-semibold">Key Achievements:</h4>
              <ul className="space-y-1 list-disc list-inside text-sm">
                {experience.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mx-4 my-4 md:my-0 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
        <span className="text-primary-foreground font-bold">{index + 1}</span>
      </div>

      <div className="hidden md:block w-[calc(50%-40px)]"></div>
    </motion.div>
  )
}
