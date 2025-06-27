import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";

function ToggleDarkMode() {
  const [isDarkMode, setisDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const newMode = savedTheme === "dark" ? true : savedTheme === "light" ? false : prefersDark;

    if (newMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setisDarkMode(newMode);
  }, []);

  function toggleDarkMode() {
    const html = document.documentElement;
    const newMode = !isDarkMode;

    if (newMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setisDarkMode(newMode);
  }

  return (
    <Button onClick={toggleDarkMode} size="icon">
      {isDarkMode ? <MoonStar/> : <Sun />}
    </Button>
  );
}

export default ToggleDarkMode;
