import "./App.css";
import MenuBar from "./components/Compounds/MenuBar";
import Table from "./components/Compounds/Table";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 p-6 rounded-lg w-full">
        <MenuBar></MenuBar>
        <div className="overflow-x-auto rounded-lg">
          <Table></Table>
        </div>
      </div>
    </>
  );
}

export default App;
