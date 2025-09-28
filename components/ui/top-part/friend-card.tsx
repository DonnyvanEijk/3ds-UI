"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"

export const FriendCard = () => {
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    let animationFrameId: number
    const pollGamepad = () => {
      const gamepads = navigator.getGamepads()
      let pressed = false

      for (const gp of gamepads) {
        if (!gp) continue
        if (gp.buttons[4]?.pressed) pressed = true
      }

      setIsPressed(pressed)
      animationFrameId = requestAnimationFrame(pollGamepad)
    }

    animationFrameId = requestAnimationFrame(pollGamepad)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="fixed top-10 left-0 z-[1000]">
      <div
        className={clsx(
          "relative bg-[#f3f4f6] border-gray-500 text-gray-500 border-3 py-5 pr-10 w-64 rounded-r-full rounded-l-none flex flex-row gap-2 shadow-xl border-l-0 transition-transform duration-150",
          isPressed && "scale-110"
        )}
      >
        <div className="flex items-center gap-3 ml-2">
          <span className="text-gray-500 font-semibold text-2xl">+4</span>
          <div className="flex -space-x-3">
            {[
              "https://randomuser.me/api/portraits/men/32.jpg",
              "https://randomuser.me/api/portraits/women/44.jpg",
              "https://randomuser.me/api/portraits/men/65.jpg",
              "https://randomuser.me/api/portraits/women/12.jpg",
            ].map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Friend ${idx + 1}`}
                className="w-14 h-14 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 10 - idx }}
              />
            ))}
          </div>
          <span
            className="absolute -top-3 right-1 z-10 bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full drop-shadow-md"
            title="Press LB for more info"
          >
            LB
          </span>
        </div>
      </div>
    </div>
  )
}
