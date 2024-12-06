import React, { useState, useEffect } from "react";
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
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Turtle,
  Rabbit,
  Code,
  Settings,
  CloudDownload,
  Leaf,
} from "lucide-react";
import { useUserContext } from "@/Context/UserContext";
// Define the type for Data settings
type DataSettings = {
  mode: "normal" | "detail";
  dataSaver: boolean;
  offlineSave: boolean;
};

const DataSettingsDropdown: React.FC = () => {
  const [DataSettings, setDataSettings] = useState<DataSettings>({
    mode: "normal",
    dataSaver: true,
    offlineSave: true,
  });
  const {
    mode,
    toggleMode,
    offlineMode,
    dataSaver,
    toggleOfflineMode,
    toggleDataSaver,
  } = useUserContext();

  useEffect(() => {
    const savedDataSaver = localStorage.getItem("dataSaver") === "true";
    const savedOfflineMode = localStorage.getItem("offlineMode") === "true";

    updateSetting("dataSaver", savedDataSaver);
    updateSetting("offlineSave", savedOfflineMode);
  }, []);
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
          onValueChange={(value) => {
            updateSetting("mode", value as DataSettings["mode"]);
            if (value === mode) return; // do nothing on same button press

            toggleMode();
          }}
        >
          <DropdownMenuRadioItem value="normal" className="cursor-pointer">
            <Turtle className="mr-2 h-4 w-4" /> Normal
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="detail" className="cursor-pointer">
            <Rabbit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* Couldn't  make it to final implementation*/}
        {/* <DropdownMenuSub>
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
        </DropdownMenuSub> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Leaf className="mr-2 h-4 w-4" />
            <span>Data Saver</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={DataSettings.dataSaver ? "on" : "off"}
                onValueChange={(value) => {
                  const isOn = value === "on";
                  if (dataSaver === isOn) return; // Avoid unnecessary state updates

                  // Update local settings and toggle data saver mode
                  updateSetting("dataSaver", isOn);
                  toggleDataSaver(isOn);
                }}
              >
                <DropdownMenuRadioItem value="on" className="cursor-pointer">
                  On
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="off" className="cursor-pointer">
                  Off
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <CloudDownload className="mr-2 h-4 w-4" />
            <span>Offline Access</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={DataSettings.offlineSave ? "on" : "off"}
                onValueChange={(value) => {
                  const isOn = value === "on";
                  if (offlineMode === isOn) return; // Avoid unnecessary state updates

                  // Update local settings and toggle data saver mode
                  updateSetting("offlineSave", isOn);
                  toggleOfflineMode(isOn);
                }}
              >
                <DropdownMenuRadioItem value="on" className="cursor-pointer">
                  On
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="off" className="cursor-pointer">
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
