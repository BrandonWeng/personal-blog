"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "@phosphor-icons/react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md w-6 h-6 flex items-center justify-center">
      <span className="sr-only">Toggle mode</span>
      {theme !== "dark" ? (
        <Moon />
      ) : (
        <Sun />
      )}
    </button>
  )
}
