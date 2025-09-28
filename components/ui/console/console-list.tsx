"use client"

import { useState, useEffect, useRef } from "react"
import { ConsoleCard } from "./console-card"
import consolesData from "../../../storage/consoles.json"
import { GameCard } from "./game-card"
import clsx from "clsx"

export default function ConsoleList() {
  const consoles = consolesData
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [menuState, setMenuState] = useState<"console" | "game">("console")
  const [selectedGameIndex, setSelectedGameIndex] = useState(0)
  const lastMoveTimeRef = useRef(0)
  const DEADZONE = 0.5
  const MOVE_DELAY = 200

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (menuState === "console") {
        if (e.key === "ArrowDown")
          setSelectedIndex((prev) => (prev + 1) % consoles.length)
        if (e.key === "ArrowUp")
          setSelectedIndex((prev) => (prev === 0 ? consoles.length - 1 : prev - 1))
        if (e.key === "Enter") {
          setMenuState("game")
          setSelectedGameIndex(0)
        }
      } else {
        const games = consoles[selectedIndex].games
        if (e.key === "ArrowDown")
          setSelectedGameIndex((prev) => (prev + 1) % games.length)
        if (e.key === "ArrowUp")
          setSelectedGameIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1))
        if (e.key === "Backspace") setMenuState("console")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    let animationFrameId: number

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads()
      for (const gp of gamepads) {
        if (!gp) continue
        const now = performance.now()

        if (menuState === "console") {
          const up = gp.buttons[12]?.pressed || gp.axes[1] < -DEADZONE
          const down = gp.buttons[13]?.pressed || gp.axes[1] > DEADZONE
          const a = gp.buttons[0]?.pressed

          if ((up || down) && now - lastMoveTimeRef.current > MOVE_DELAY) {
            if (up) setSelectedIndex((prev) => (prev === 0 ? consoles.length - 1 : prev - 1))
            if (down) setSelectedIndex((prev) => (prev + 1) % consoles.length)
            lastMoveTimeRef.current = now
          }
          if (a) setMenuState("game")
        } else {
          const games = consoles[selectedIndex].games
          const up = gp.buttons[12]?.pressed || gp.axes[1] < -DEADZONE
          const down = gp.buttons[13]?.pressed || gp.axes[1] > DEADZONE
          const b = gp.buttons[1]?.pressed

          if ((up || down) && now - lastMoveTimeRef.current > MOVE_DELAY) {
            if (up) setSelectedGameIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1))
            if (down) setSelectedGameIndex((prev) => (prev + 1) % games.length)
            lastMoveTimeRef.current = now
          }
          if (b) setMenuState("console")
        }
      }
      animationFrameId = requestAnimationFrame(pollGamepad)
    }

    animationFrameId = requestAnimationFrame(pollGamepad)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      cancelAnimationFrame(animationFrameId)
    }
  }, [menuState, selectedIndex])

  const CARD_HEIGHT = 260
  const CARD_SPACING = CARD_HEIGHT * 0.6

  return (
    <div className="h-screen w-[100vw] flex items-center justify-center overflow-hidden relative">
      <div
        className={clsx(
          "relative w-[100vw] ml-10 h-[500px] flex flex-col items-center justify-center transition-all duration-500",
          menuState === "game" ? "scale-75 -translate-x-96 opacity-70" : "scale-100 translate-x-0 opacity-100"
        )}
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
                selected={i === selectedIndex && menuState === "console"}
                color1={c.color1}
                color2={c.color2}
                color3={c.color3}
              />
            </div>
          )
        })}
      </div>

      {/* Games Menu */}
      <div
        className={clsx(
          "absolute top-0 w-[50vw] h-full flex flex-col items-center justify-center  p-6 transition-all duration-500",
          menuState === "game" ? "translate-x-0 opacity-100" : "translate-x-96 opacity-0"
        )}
      >
        {menuState === "game" &&
          consoles[selectedIndex].games.map((game, i) => {
            const offset = i - selectedGameIndex
            const absOffset = Math.abs(offset)
            const translateY = offset * CARD_SPACING
            const scale = 1 - absOffset * 0.15
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3
            const zIndex = 100 - absOffset
            return (
              <div
                key={game.name}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "all 0.3s ease-out",
                  position: "absolute",
                  width: "100%",
                }}
              >
                <GameCard
                  name={game.name}
                  icon={game.icon}
                  selected={i === selectedGameIndex}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
