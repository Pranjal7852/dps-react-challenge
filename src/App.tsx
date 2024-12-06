import "./App.css";
import AppHeader from "./components/Compounds/AppHeader";
import MenuBar from "./components/Compounds/MenuBar";
import Table from "./components/Compounds/Table";
import InteractiveBackground from "./components/Molecules/InteractiveBackground";
import { useTheme } from "./Context/ThemeContext";
function App() {
  const { themeSettings } = useTheme();
  return (
    <>
      {themeSettings.theme === "DPS" && <InteractiveBackground />}
      <div className="flex flex-col gap-4 p-4 rounded-lg w-full z-10">
        <AppHeader></AppHeader>
        <MenuBar></MenuBar>
        <div className="overflow-x-auto rounded-lg">
          <Table></Table>
        </div>
      </div>
    </>
  );
}

export default App;
