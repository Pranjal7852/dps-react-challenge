import { useTheme } from "@/Context/ThemeContext";
import dpsLogo from "@/assets/DPS.svg";
import { BrainCog } from "lucide-react";
const AppHeader = () => {
  const { themeSettings } = useTheme();
  const bgClass =
    themeSettings.theme === "dark" ? "bg-white" : "bg-transparent";
  const textColor =
    themeSettings.theme === "dark" ? "text-black" : "text-gray-800";
  return (
    <div
      className={`${bgClass} ${textColor} p-2 flex items-center justify-between border shadow-md`}
    >
      <div className="text-left flex items-center gap-2 ml-2">
        <div>
          <BrainCog className="w-16 h-16" strokeWidth={1} />
        </div>
        <div>
          <h1 className="text-xl font-bold">ReactCRM+</h1>
          <p className="text-gray-500 text-sm">{`Light Weight Web Application to Manage Customer Data`}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <a href="https://www.digitalproductschool.io/" target="_blank">
          <img src={dpsLogo} className="logo" alt="DPS logo" />
        </a>
      </div>
    </div>
  );
};

export default AppHeader;
