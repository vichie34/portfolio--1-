"use client"
import { useEffect, useState, useRef } from "react"
import { SunIcon, MoonIcon, DownloadIcon, GithubIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "@/components/theme-provider"
import ProjectCard from "@/components/project-card"
import ExperienceTimeline from "@/components/experience-timeline"
import ContactForm from "@/components/contact-form"
import SkillsSection from "@/components/skills-section"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import GradientSphere from "@/components/GradientSphere"
import Hero from "@/components/hero"
import MapSection from "@/app/map-section"

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionRefs {
  [key: string]: HTMLElement | null;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className || ""}
    >
      {children}
    </motion.div>
  );
};

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (ref: typeof aboutRef) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header
        className={`fixed top-2 ${isScrolled ? "left-1/2 transform -translate-x-1/2 w-[70%] rounded-[40px]" : "w-full"} z-50 transition-all duration-1000 ${isScrolled
          ? "bg-[#ccc]/80 backdrop-blur-sm py-4"
          : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold">
            Vichie
          </a>
          <nav className="hidden md:flex space-x-8 text-lg">
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection(projectsRef)} className="hover:text-primary transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection(skillsRef)} className="hover:text-primary transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection(experienceRef)} className="hover:text-primary transition-colors">
              Experience
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-primary transition-colors">
              Contact
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Button className="bg-gradient-to-br from-blue-500 via-pink-500 to-purple-500 hidden md:flex">
              <a
                href="/resume.pdf" // Ensure this path matches the location of your resume file
                download="Victor_Chukwuma_Resume.pdf" // Suggested file name for download
                className="hidden md:flex items-center font-bold px-4 py-2"
              >
                <DownloadIcon className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {/* <HeroSection /> */}
      <Hero />

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-muted/50">
        <div className="container mx-auto px-5">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="">
              <div className="space-y-6">
                <p className="text-lg">
                  I'm a passionate Frontend Developer with over 3 years of experience creating modern web applications.
                  I specialize in Next, React, Node.js, and cloud technologies, with a strong focus on creating performant and
                  accessible user experiences.
                </p>
                <p className="text-lg">
                  My approach combines technical excellence with creative problem-solving. I'm constantly learning new
                  technologies and techniques to stay at the forefront of Software development.
                </p>
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4">Core Skills</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">UI Development</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">API Integration</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Version Control</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/profile_port.jpg?height=600&width=600"
                    alt="Victor Dev"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              A selection of my recent work, showcasing my skills and expertise in frontend web development.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <ProjectCard
                title="Admin UI development"
                description="A full-featured financial tracking User Interface for administrators"
                image="/Screenshot_18-4-2025_13719_localhost.jpeg?height=400&width=600"
                tags={["Next", "Node.js", "Typescript"]}
                demoLink="https://dashboard-lac-six-40.vercel.app/dashboard"
                githubLink="https://github.com/vichie34/dashboard"
              />
            </AnimatedSection>
            <AnimatedSection>
              <ProjectCard
                title="Vision Testing Application"
                description="A mobile-first AI-powered web app with decentralized payment method and authenticaton."
                image="/opticheck.jpeg?height=400&width=600"
                tags={["React", "Tailwindcss", "Typescript", "API Integration"]}
                demoLink="https://opticheck.netlify.app"
                githubLink="https://github.com/vichie34/opticalTech"
              />
            </AnimatedSection>
            <AnimatedSection>
              <ProjectCard
                title="Wistop virtual top-up application"
                description="A virtual top-up application with a responsive design and user-friendly interface."
                image="/Screenshot_7-5-2025_62543_wistopup-demo.netlify.app.jpeg?height=400&width=600"
                tags={["Jvascript", "Jquery", "Css3", "Html5"]}
                demoLink="https://wistopup-demo.netlify.app/"
                githubLink="https://github.com/vichie34/wistopVtu"
              />
            </AnimatedSection>
            <AnimatedSection>
              <ProjectCard
                title="Real Estate Website"
                description="A Real Estate landing page with login/Sign up."
                image="/Screenshot (122).png?height=400&width=600"
                tags={["React", "API Integration", "Node", "Figma"]}
                demoLink="https://vermillion-entremet-129645.netlify.app/"
                githubLink="https://github.com/vichie34/real-estate"
              />
            </AnimatedSection>
            <AnimatedSection>
              <ProjectCard
                title="Social Media Platform"
                description="A social networking platform with messaging and content sharing on mobile app."
                image="/Screenshot_22-4-2025_8550_localhost.jpeg?height=400&width=600"
                tags={["React", "API Integration", "Figma"]}
                demoLink="https://hilarious-heliotrope-cbb8c9.netlify.app/"
                githubLink="https://github.com/Confide"
              />
            </AnimatedSection>
            <AnimatedSection>
              <ProjectCard
                title="Vehicle security Dashboard"
                description="A vehicle application with theft report, Vehicle Identification retrival/Issuance."
                image="/Screenshot_23-4-2025_104925_.jpeg?height=400&width=600"
                tags={["Vanilla JS", "API Integration", "Local Storage"]}
                demoLink="https://spacev7.netlify.app"
                githubLink="https://github.com/vichie34/kelli_project"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-muted/50">
        <AnimatedSection>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Technical Skills</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              My technical toolkit and areas of expertise.
            </p>

            <SkillsSection />
          </div>
        </AnimatedSection>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="py-20">
        <AnimatedSection>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Professional Experience</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              My journey as a developer and the companies I've worked with.
            </p>

            <ExperienceTimeline />
          </div>
        </AnimatedSection>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-muted/50">
        <AnimatedSection>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Get In Touch</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <MapPinIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">Ebonyi state, Nigeria</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground"><a href="mailto:victorchukwuma@proton.me">victorchukwuma@proton.me</a></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/vichie34"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/victor-chukwuma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="pt-8">
                  <MapSection />
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </AnimatedSection>

      </section>
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Victor Chukwuma. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}