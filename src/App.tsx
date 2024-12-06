import "./App.css";
import AppHeader from "./components/Compounds/AppHeader";
import MenuBar from "./components/Compounds/MenuBar";
import Table from "./components/Compounds/Table";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 p-4 rounded-lg w-full">
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
