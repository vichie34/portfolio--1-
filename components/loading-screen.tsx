"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Portfolio</h1>
        <div className="w-64 md:w-96 mb-4">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-white">Loading experience... {progress}%</p>
      </motion.div>
    </div>
  )
}