"use client"

import { useState, useEffect, useRef } from "react"
import { ConsoleCard } from "./console-card"

const consoles = [
  { name: "Nintendo DS", totalGames: 67, icon: "https://picsum.photos/seed/ds/400/400", color1: "#EF4444", color2: "#3B82F6", color3: "#EC4899" },
  { name: "Game Boy Advance", totalGames: 42, icon: "https://picsum.photos/seed/gba/400/400", color1: "#22C55E", color2: "#FACC15", color3: "#84CC16" },
  { name: "Nintendo 64", totalGames: 18, icon: "https://picsum.photos/seed/n64/400/400", color1: "#3B82F6", color2: "#A78BFA", color3: "#06B6D4" },
  { name: "GameCube", totalGames: 25, icon: "https://picsum.photos/seed/gc/400/400", color1: "#8B5CF6", color2: "#EC4899", color3: "#C4B5FD" },
  { name: "Wii", totalGames: 34, icon: "https://picsum.photos/seed/wii/400/400", color1: "#14B8A6", color2: "#22D3EE", color3: "#60A5FA" },
]

export default function ConsoleList() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const lastMoveTimeRef = useRef(0)
  const DEADZONE = 0.5
  const MOVE_DELAY = 200 // milliseconds

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") setSelectedIndex((prev) => (prev + 1) % consoles.length)
      if (e.key === "ArrowUp") setSelectedIndex((prev) => (prev === 0 ? consoles.length - 1 : prev - 1))
    }
    window.addEventListener("keydown", handleKeyDown)

    let animationFrameId: number

    const pollGamepad = (timestamp: number) => {
      const gamepads = navigator.getGamepads()
      for (const gp of gamepads) {
        if (!gp) continue

        const now = performance.now()
        const upPressed = gp.buttons[12]?.pressed || gp.axes[1] < -DEADZONE
        const downPressed = gp.buttons[13]?.pressed || gp.axes[1] > DEADZONE

        if ((upPressed || downPressed) && now - lastMoveTimeRef.current > MOVE_DELAY) {
          if (upPressed) setSelectedIndex((prev) => (prev === 0 ? consoles.length - 1 : prev - 1))
          if (downPressed) setSelectedIndex((prev) => (prev + 1) % consoles.length)
          lastMoveTimeRef.current = now
        }
      }
      animationFrameId = requestAnimationFrame(pollGamepad)
    }

    animationFrameId = requestAnimationFrame(pollGamepad)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const CARD_HEIGHT = 260
  const CARD_SPACING = CARD_HEIGHT * 0.6

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="relative ml-10 w-[1000px] h-[500px] flex flex-col items-center justify-center"
        style={{ perspective: 1500 }}
      >
        {consoles.map((c, i) => {
          const offset = i - selectedIndex
          const absOffset = Math.abs(offset)
          const translateY = offset * CARD_SPACING
          const scale = 1 - absOffset * 0.15
          const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3
          const zIndex = 100 - absOffset
          return (
            <div
              key={c.name}
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex,
                transition: "all 0.3s ease-out",
                position: "absolute",
                width: "100%",
              }}
            >
              <ConsoleCard
                name={c.name}
                totalGames={c.totalGames}
                icon={c.icon}
                selected={i === selectedIndex}
                color1={c.color1}
                color2={c.color2}
                color3={c.color3}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
