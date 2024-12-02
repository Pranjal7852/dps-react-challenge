import './App.css';
import MenuBar from "./components/Compounds/MenuBar";

function App() {
	return (
		<>
			<div className="flex flex-col gap-4 p-6 rounded-lg bg-white w-full">
				<MenuBar></MenuBar>


				{/* Table */}
				<div className="overflow-x-auto rounded-lg">
					<table className="w-full table-auto border-collapse border border-gray-300">
						<thead>
							<tr className="bg-gray-100 text-center">
								<th className="border border-gray-300 px-4 py-2">Name</th>
								<th className="border border-gray-300 px-4 py-2">City</th>
								<th className="border border-gray-300 px-4 py-2">Birthday</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-gray-300 px-4 py-2">Alotta Fudge</td>
								<td className="border border-gray-300 px-4 py-2">New York</td>
								<td className="border border-gray-300 px-4 py-2">1.3.1995</td>
							</tr>
							<tr>
								<td className="border border-gray-300 px-4 py-2">Anita Bath</td>
								<td className="border border-gray-300 px-4 py-2">Jacksonville</td>
								<td className="border border-gray-300 px-4 py-2">7.5.1980</td>
							</tr>
							<tr className="bg-blue-100">
								<td className="border border-gray-300 px-4 py-2">Stan Still</td>
								<td className="border border-gray-300 px-4 py-2">Dallas</td>
								<td className="border border-gray-300 px-4 py-2">31.10.1952</td>
							</tr>
							<tr className="bg-blue-100">
								<td className="border border-gray-300 px-4 py-2">Terry Aki</td>
								<td className="border border-gray-300 px-4 py-2">Columbus</td>
								<td className="border border-gray-300 px-4 py-2">3.1.1960</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default App;
