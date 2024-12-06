import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Sparkle,
  Settings2,
  FileType,
  AArrowDown,
  AArrowUp,
  Bold,
} from "lucide-react";
import { useTheme } from "@/Context/ThemeContext";
// Define the type for theme settings
type ThemeSettings = {
  theme: "light" | "dark" | "DPS";
  highContrast: boolean;
  fontSize: number;
  boldText: boolean;
};

const ThemeSettingsDropdown: React.FC = () => {
  const { themeSettings, updateThemeSetting } = useTheme();
  const increaseFontSize = () => {
    updateThemeSetting("fontSize", themeSettings.fontSize + 2);
  };

  const decreaseFontSize = () => {
    updateThemeSetting("fontSize", Math.max(8, themeSettings.fontSize - 2));
  };

  const toggleBoldText = () => {
    updateThemeSetting("boldText", !themeSettings.boldText);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel className="flex items-center">
          <Settings2 className="mr-2 h-4 w-4" /> Customize Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Theme Mode */}
        <DropdownMenuLabel>Theme Mode</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={themeSettings.theme}
          onValueChange={(value) =>
            updateThemeSetting("theme", value as ThemeSettings["theme"])
          }
        >
          <DropdownMenuRadioItem value="light" className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" /> Light
          </DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem value="dark" className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" /> Dark
          </DropdownMenuRadioItem> */}
          {/* <DropdownMenuRadioItem value="DPS" className="cursor-pointer">
            <Sparkle className="mr-2 h-4 w-4" /> DPS
          </DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* Color Blindness Mode */}
        <DropdownMenuLabel>Accessibility</DropdownMenuLabel>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileType className="mr-2 h-4 w-4" />
            <span>Font</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={increaseFontSize}>
                <AArrowUp className="mr-2 h-4 w-4" />
                <span>Larger</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={decreaseFontSize}>
                <AArrowDown className="mr-2 h-4 w-4" />
                <span>Smaller</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleBoldText}>
                <Bold className="mr-2 h-4 w-4" />
                <span>{themeSettings.boldText ? "Unbold" : "Bold"}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSettingsDropdown;
