import "./App.css";
import MenuBar from "./components/Compounds/MenuBar";
import axios from "axios";
import { useEffect } from "react";
import Table from "./components/Compounds/Table";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("https://dummyjson.com/users");
        const city = processData(response.data.users);
        setCities(city);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full">
        <MenuBar></MenuBar>
        <div className="overflow-x-auto rounded-lg">
          <Table></Table>
        </div>
      </div>
    </>
  );
}

export default App;
