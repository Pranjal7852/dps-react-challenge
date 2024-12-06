import "./App.css";
import MenuBar from "./components/Compounds/MenuBar";
import Table from "./components/Compounds/Table";
import dpsLogo from "./assets/DPS.svg";
import { useTheme } from "./Context/ThemeContext";
import { BrainCog } from "lucide-react";
function App() {
  const { themeSettings } = useTheme();
  const bgClass =
    themeSettings.theme === "dark" ? "bg-white" : "bg-transparent";
  const textColor =
    themeSettings.theme === "dark" ? "text-black" : "text-gray-800";
  return (
    <>
      <div className="flex flex-col gap-4 p-4 rounded-lg w-full">
        <div
          className={`${bgClass} ${textColor} p-2 rounded-lg flex items-center justify-between`}
        >
          <div className="text-left flex items-center gap-2 ml-2">
            <div>
              <BrainCog className="w-16 h-16" strokeWidth={1} />
            </div>
            <div>
              <h1 className="text-xl font-bold">ReactPulse</h1>
              <p className="text-gray-500 text-sm">{`Light Weight Web Application to Manage Customer Data`}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <a href="https://www.digitalproductschool.io/" target="_blank">
              <img src={dpsLogo} className="logo" alt="DPS logo" />
            </a>
          </div>
        </div>
        <MenuBar></MenuBar>
        <div className="overflow-x-auto rounded-lg">
          <Table></Table>
        </div>
      </div>
    </>
  );
}

export default App;
