import { Card, CardContent } from "./ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "./ui/table";

export interface CalculationsType {
	id: string;
	volume: string;
	density: string;
	temperature: string;
	vcf: string;
	tonnage: string;
	createdAt: string;
}
interface TonnageTableComponentProps {
	calculations: CalculationsType[];
}

export default function TableComponent({
	calculations,
}: TonnageTableComponentProps) {
	return (
		<Card>
			<CardContent className='p-0'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>id</TableHead>
							<TableHead>volume</TableHead>
							<TableHead>density</TableHead>
							<TableHead>temperature</TableHead>
							<TableHead>vcf</TableHead>
							<TableHead>tonnage</TableHead>
							<TableHead>Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{calculations.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center py-8 text-muted-foreground'>
									No calculations found. Try adjusting your filters.
								</TableCell>
							</TableRow>
						) : (
							calculations.map((calculations, index) => (
								<TableRow
									key={index}
									className='cursor-pointer hover:bg-muted/50'>
									<TableCell>
										<div className='flex items-center gap-3'>
											<div>
												<div className='font-medium'>{calculations.id}</div>
											</div>
										</div>
									</TableCell>
									<TableCell>{calculations.volume}</TableCell>
									<TableCell>{calculations.density}</TableCell>
									<TableCell>{calculations.temperature}</TableCell>
									<TableCell>{calculations.vcf}</TableCell>
									<TableCell>{calculations.tonnage}</TableCell>
									<TableCell>{calculations.createdAt}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
