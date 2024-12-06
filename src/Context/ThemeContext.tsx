import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeSettings = {
  theme: "light" | "dark" | "DPS";
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
  },
  updateThemeSetting: () => {},
});

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    theme: "light",
  });

  // Effect to apply theme settings
  useEffect(() => {
    // Apply theme mode
    document.documentElement.classList.remove("light", "dark", "DPS");
    document.documentElement.classList.add(themeSettings.theme);

    // // Apply high contrast
    // if (themeSettings.highContrast) {
    //   document.documentElement.classList.add("high-contrast");
    // } else {
    //   document.documentElement.classList.remove("high-contrast");
    // }

    // Apply primary color
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   themeSettings.primaryColor
    // );
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
