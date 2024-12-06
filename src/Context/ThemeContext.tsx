import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeSettings = {
  theme: "light" | "dark" | "DPS";
  fontSize: number;
  boldText: boolean;
};

const ThemeContext = createContext<{
  themeSettings: ThemeSettings;
  updateThemeSetting: <T extends keyof ThemeSettings>(
    key: T,
    value: ThemeSettings[T]
  ) => void;
}>({
  themeSettings: {
    theme: "light",
    fontSize: 16,
    boldText: false,
  },
  updateThemeSetting: () => {},
});

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    theme: "light",
    fontSize: 16,
    boldText: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("themeSettings");
    if (savedSettings) {
      setThemeSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Effect to apply theme settings
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "DPS");
    document.documentElement.classList.add(themeSettings.theme);

    document.documentElement.style.fontSize = `${themeSettings.fontSize}px`;
    document.documentElement.style.fontWeight = themeSettings.boldText
      ? "bold"
      : "normal";
    if (themeSettings.theme === "DPS") {
      document.body.style.backgroundColor = "transparent"; // Set body background to transparent
    } else {
      document.body.style.backgroundColor = "white"; // Reset background color for other themes
    }
  }, [themeSettings]);

  const updateThemeSetting = <T extends keyof ThemeSettings>(
    key: T,
    value: ThemeSettings[T]
  ) => {
    console.log("theme i got toggled");
    setThemeSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ThemeContext.Provider value={{ themeSettings, updateThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
