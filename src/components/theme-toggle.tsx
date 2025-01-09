"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, MoonStar } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <Button
        variant="ghost"
        className="h-9 w-9 px-0"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme === "dark" ? <Sun /> : <MoonStar />}
      </Button>
    </>
  );
}
