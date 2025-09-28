"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"

type ButtonConfig = {
  label: string
  key: string
}

type Props = {
  position?: "left" | "right"
  buttons?: ButtonConfig[]
}

export const BottomControls = ({ position = "left", buttons = [] }: Props) => {
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set())

  useEffect(() => {
    let animationFrameId: number

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads()
      const newPressed = new Set<string>()

      for (const gp of gamepads) {
        if (!gp) continue

        buttons.forEach((btn) => {
          const mapping: Record<string, number> = {
            A: 0,
            B: 1,
            X: 2,
            Y: 3,
            L: 4,
            R: 5,
            "-": 8,
            "+": 9,
          }
          const index = mapping[btn.key]
          if (index !== undefined && gp.buttons[index]?.pressed) {
            newPressed.add(btn.key)
          }
        })
      }

      if (newPressed.size > 0) setPressedButtons(newPressed)
      else setPressedButtons(new Set())

      animationFrameId = requestAnimationFrame(pollGamepad)
    }

    animationFrameId = requestAnimationFrame(pollGamepad)

    return () => cancelAnimationFrame(animationFrameId)
  }, [buttons])

  return (
    <div
      className={clsx(
        "fixed bottom-5 z-[1000]",
        position === "right" ? "right-0 mr-5" : "left-0 ml-5"
      )}
    >
      <div className="relative bg-white text-gray-500 py-5 px-6 w-auto flex flex-col gap-4 shadow-xl rounded-lg">
        {buttons.map((btn, i) => {
          const isPressed = pressedButtons.has(btn.key)
          return (
            <div key={i} className="flex flex-row gap-1 items-center text-center">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full text-xl bg-white border-2 border-gray-300 flex items-center justify-center font-bold text-gray-700 shadow transition-transform duration-150",
                  isPressed && "scale-125"
                )}
              >
                {btn.key}
              </div>
              <span className="text-lgn font-bold mt-1">{btn.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
