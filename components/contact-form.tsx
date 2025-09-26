"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

// Types
interface FormErrors {
  name?: string
  email?: string
  message?: string
  [key: string]: string | undefined
}

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error("One or more environment variables are not defined.")
      setIsSubmitting(false)
      return
    }

    if (!formRef.current) {
      console.error("Form ref is not attached to the form element.")
      setIsSubmitting(false)
      return
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setIsSubmitted(true)
      setFormState(initialFormState)
    } catch (error) {
      console.error("Email JS ERROR:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-8 bg-muted rounded-lg"
      >
        <div className="mb-6 text-primary">
          <CheckCircle className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Your email"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder="Subject (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={6}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-destructive text-sm">{errors.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}