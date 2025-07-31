import { useEffect, useState } from "react";
import TableComponent from "./table";
import TonnageFormComponent from "./ToonageForm";

export default function DashboardComponent() {
	const [Stats, setStats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/data");
			if (!response.ok) throw new Error("Failed to fetch stats.");
			const data = await response.json();
			setStats(data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		console.log("Stats:", Stats);
	}, []);

	useEffect(() => {
		console.log("Updated Stats:", Stats);
	}, [Stats]);

	return (
		<div>
			<div className='p-6 space-y-6'>
				{loading ? (
					<p className='text-center'>Loading stats...</p>
				) : error ? (
					<p className='text-red-500 text-center'>{error}</p>
				) : (
					<>
						<TonnageFormComponent />
						<TableComponent calculations={Stats} />
					</>
				)}
			</div>
		</div>
	);
}
