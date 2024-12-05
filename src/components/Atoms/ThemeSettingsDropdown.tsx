import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Sparkle,
  Contrast,
  Settings2,
  FileType,
  AArrowDown,
  AArrowUp,
  Bold,
  Eye,
} from "lucide-react";

// Define the type for theme settings
type ThemeSettings = {
  mode: "light" | "dark" | "system";
  highContrast: boolean;
  primaryColor: string;
  colorBlindMode: "none" | "deuteranopia" | "protanopia";
};

const ThemeSettingsDropdown: React.FC = () => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    mode: "DPS",
    highContrast: false,
    primaryColor: "#3B82F6",
    colorBlindMode: "none",
  });

  const updateSetting = <T extends keyof ThemeSettings>(
    key: T,
    value: ThemeSettings[T]
  ) => {
    setThemeSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
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
          value={themeSettings.mode}
          onValueChange={(value) =>
            updateSetting("mode", value as ThemeSettings["mode"])
          }
        >
          <DropdownMenuRadioItem value="light" className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DPS" className="cursor-pointer">
            <Sparkle className="mr-2 h-4 w-4" /> DPS
          </DropdownMenuRadioItem>
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
              <DropdownMenuItem>
                <AArrowUp className="mr-2 h-4 w-4" />
                <span>Larger</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AArrowDown className="mr-2 h-4 w-4" />
                <span>Smaller</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bold className="mr-2 h-4 w-4" />
                <span>Bold</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Eye className="mr-2 h-4 w-4" />
            <span>Visual</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
                checked={themeSettings.highContrast}
                onCheckedChange={(checked) =>
                  updateSetting("highContrast", !!checked)
                }
              >
                <Contrast className="mr-2 h-4 w-4" /> High Contrast
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem>
                <AArrowDown className="mr-2 h-4 w-4" />
                <span>Smaller</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bold className="mr-2 h-4 w-4" />
                <span>Bold</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSettingsDropdown;
