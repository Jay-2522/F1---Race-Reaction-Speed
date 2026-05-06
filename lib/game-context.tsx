"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { GameSettings, ReactionTimeRecord } from "./types"

interface GameContextType {
  settings: GameSettings
  updateSettings: (settings: Partial<GameSettings>) => void
  reactionTimes: ReactionTimeRecord[]
  addReactionTime: (record: ReactionTimeRecord) => void
  clearReactionTimes: () => void
  bestTime: ReactionTimeRecord | null
}

const defaultSettings: GameSettings = {
  difficulty: "medium",
  numberOfDrivers: 5,
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(() => {
    // Try to load settings from localStorage
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("gameSettings")
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings
    }
    return defaultSettings
  })

  const [reactionTimes, setReactionTimes] = useState<ReactionTimeRecord[]>(() => {
    // Try to load reaction times from localStorage
    if (typeof window !== "undefined") {
      const savedTimes = localStorage.getItem("reactionTimes")
      return savedTimes ? JSON.parse(savedTimes) : []
    }
    return []
  })

  // Calculate best time
  const bestTime =
    reactionTimes.length > 0
      ? reactionTimes.reduce(
          (best, current) => (best === null || current.time < best.time ? current : best),
          null as ReactionTimeRecord | null,
        )
      : null

  // Update settings
  const updateSettings = (newSettings: Partial<GameSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("gameSettings", JSON.stringify(updatedSettings))
    }
  }

  // Add a new reaction time
  const addReactionTime = (record: ReactionTimeRecord) => {
    const updatedTimes = [record, ...reactionTimes].slice(0, 10) // Keep only the 10 most recent times
    setReactionTimes(updatedTimes)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("reactionTimes", JSON.stringify(updatedTimes))
    }
  }

  // Clear all reaction times
  const clearReactionTimes = () => {
    setReactionTimes([])

    // Clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("reactionTimes")
    }
  }

  return (
    <GameContext.Provider
      value={{
        settings,
        updateSettings,
        reactionTimes,
        addReactionTime,
        clearReactionTimes,
        bestTime,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
