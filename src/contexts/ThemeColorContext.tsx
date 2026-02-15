"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type ThemeColorContextType = {
    color: string
    setColor: (color: string) => void
    presetColors: string[]
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined)

const PRESET_COLORS = [
    "#3b82f6", // Blue (Default)
    "#ef4444", // Red
    "#22c55e", // Green
    "#a855f7", // Purple
    "#f59e0b", // Amber
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#f97316", // Orange
]

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
    const [color, setColorState] = useState("#3b82f6")

    useEffect(() => {
        // Load saved color from localStorage
        const savedColor = localStorage.getItem("theme-color")
        if (savedColor) {
            setColorState(savedColor)
            updateCSSVariables(savedColor)
        } else {
            updateCSSVariables("#3b82f6")
        }
    }, [])

    const updateCSSVariables = (color: string) => {
        const root = document.documentElement

        root.style.setProperty("--brand-500", color)
    }

    const setColor = (newColor: string) => {
        setColorState(newColor)
        localStorage.setItem("theme-color", newColor)
        updateCSSVariables(newColor)
    }

    return (
        <ThemeColorContext.Provider value={{ color, setColor, presetColors: PRESET_COLORS }}>
            {children}
        </ThemeColorContext.Provider>
    )
}

export const useThemeColor = () => {
    const context = useContext(ThemeColorContext)
    if (context === undefined) {
        throw new Error("useThemeColor must be used within a ThemeColorProvider")
    }
    return context
}
