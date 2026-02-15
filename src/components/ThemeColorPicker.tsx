"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IoColorPalette } from "react-icons/io5"
import { useThemeColor } from "@/contexts/ThemeColorContext"
import { useLanguage } from "@/contexts/LanguageContext"

export function ThemeColorPicker() {
    const { color, setColor, presetColors } = useThemeColor()
    const { t } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors ${isOpen ? "bg-white/10 text-brand-400" : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="Change theme color"
            >
                <IoColorPalette size={24} style={{ color: isOpen ? 'var(--brand-400)' : undefined }} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-2 p-3 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl w-64 z-[60] origin-top-right"
                    >
                        <div className="text-sm font-medium text-gray-300 mb-3 ml-1">{t('header.themeColor')}</div>

                        <div className="grid grid-cols-4 gap-2 mb-3">
                            {presetColors.map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setColor(preset)}
                                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${color === preset ? "border-white" : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: preset }}
                                    aria-label={`${t('header.themeColor')} ${preset}`}
                                >
                                    {color === preset && (
                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                            <label htmlFor="custom-color" className="text-xs text-gray-400 font-medium">
                                {t('header.customColor')}
                            </label>
                            <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-full p-1 pr-3 border border-white/5 hover:border-white/20 transition-colors">
                                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                                    <input
                                        id="custom-color"
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-0 cursor-pointer"
                                    />
                                </div>
                                <span className="text-xs font-mono text-gray-300 uppercase truncate">
                                    {color}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
