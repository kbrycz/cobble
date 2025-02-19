"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = storedTheme || systemTheme;

    // Set initial theme
    document.documentElement.classList.add(initialTheme);
    setThemeState(initialTheme);
    setMounted(true);

    // Add transition class after initial render
    const timeout = setTimeout(() => {
      document.documentElement.classList.add("theme-transition");
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.documentElement.classList.remove("theme-transition");
    }
  }, []);

  const setTheme = (newTheme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};