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
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Turtle,
  Rabbit,
  Code,
  Settings,
  FileType,
  Leaf,
  Languages,
} from "lucide-react";

// Define the type for Data settings
type DataSettings = {
  mode: "normal" | "detail";
  dataSaver: boolean;
  sortButtons: boolean;
  language: string;
};

const DataSettingsDropdown: React.FC = () => {
  const [DataSettings, setDataSettings] = useState<DataSettings>({
    mode: "normal",
    dataSaver: false,
    sortButtons: false,
    language: "ENG",
  });

  const updateSetting = <T extends keyof DataSettings>(
    key: T,
    value: DataSettings[T]
  ) => {
    setDataSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel className="flex items-center">
          <Settings className="mr-2 h-4 w-4" /> App Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Data Mode */}
        <DropdownMenuLabel>Data View</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={DataSettings.mode}
          onValueChange={(value) =>
            updateSetting("mode", value as DataSettings["mode"])
          }
        >
          <DropdownMenuRadioItem value="normal" className="cursor-pointer">
            <Turtle className="mr-2 h-4 w-4" /> Normal
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="detail" className="cursor-pointer">
            <Rabbit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* Color Blindness Mode */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages className="mr-2 h-4 w-4" />
            <span>Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={DataSettings.mode}
                onValueChange={(value) =>
                  updateSetting("mode", value as DataSettings["mode"])
                }
              >
                <DropdownMenuRadioItem
                  value="normal"
                  className="cursor-pointer"
                >
                  English
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="detail"
                  className="cursor-pointer"
                >
                  German
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="detail"
                  className="cursor-pointer"
                >
                  French
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Leaf className="mr-2 h-4 w-4" />
            <span>Data Saver</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={DataSettings.mode}
                onValueChange={(value) =>
                  updateSetting("mode", value as DataSettings["mode"])
                }
              >
                <DropdownMenuRadioItem
                  value="normal"
                  className="cursor-pointer"
                >
                  On
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="detail"
                  className="cursor-pointer"
                >
                  Off
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Code />
          <span>Developer</span>
          <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataSettingsDropdown;
