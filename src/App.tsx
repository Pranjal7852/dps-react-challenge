import './App.css';
import MenuBar from "./components/Compounds/MenuBar";

function App() {
	return (
		<>
			<div className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full">
				<MenuBar></MenuBar>
			</div>
		</>
	);
}

export default App;
