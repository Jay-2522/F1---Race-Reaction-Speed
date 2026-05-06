export type Difficulty = "easy" | "medium" | "hard"

export interface GameSettings {
  difficulty: Difficulty
  numberOfDrivers: number
}

export interface DriverResult {
  name: string
  time: number
  position: number
  isUser?: boolean
}

export interface ReactionTimeRecord {
  time: number
  date: string
  difficulty: Difficulty
}
