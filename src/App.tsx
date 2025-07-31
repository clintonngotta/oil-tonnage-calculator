import "./App.css";
import DashboardComponent from "./components/dashboard";

function App() {
	return (
		<div>
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>
					Edible Oil Tonnage Calculator
				</h1>
				<p className='text-muted-foreground'>
					edible oil based on user-submitted volume, density, and temperature,
					using a Volume Correction Factor (VCF)
				</p>
			</div>
			<DashboardComponent />
		</div>
	);
}

export default App;
