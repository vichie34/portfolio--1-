"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {},
})

export const ThemeProvider = ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    setTheme(storedTheme || "light")
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
