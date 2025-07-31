"use client";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

// Define the validation schema using Zod
const formSchema = z.object({
	volume: z.number({ message: "Volume is required" }).positive(),
	density: z.number({ message: "Density is required" }).positive(),
	temperature: z.number({ message: "Temperature is required" }),
	vcf: z.number().optional(),
	tonnage: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function TonnageFormComponent() {
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	// Initialize React Hook Form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			volume: 0,
			density: 0,
			temperature: 0,
			vcf: 0,
			tonnage: 0,
		},
		mode: "onBlur",
	});

	const onSubmit = async (data: FormValues) => {
		const parsed = formSchema.parse(data);
		await calculateTonnage(parsed);
	};

	const calculateTonnage = async (input: FormValues) => {
		try {
			const response = await fetch(
				"http://localhost:3001/api/calculate-tonnage",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(input),
				}
			);

			const result = await response.json();

			if (!response.ok) {
				setError(result.error);
				throw new Error(result.error || "Failed to calculate");
			}
			setError("");
			setSubmitted(true);
			setTimeout(() => {
				form.reset();
			}, 3000);

			console.log("Tonnage result:", result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
				console.error("Error calculating tonnage:", error.message);
			} else {
				setError("An unexpected error occurred");
				console.error("Unknown error calculating tonnage:", error);
			}

			setSubmitted(false);
			console.error("Error calculating tonnage:", error);
		}
	};
	return (
		<Card className='w-full mx-auto max-w-md'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>Calculate</CardTitle>
				<CardDescription>Edible Oil Tonnage Calculator</CardDescription>
			</CardHeader>

			{submitted && (
				<CardContent className='flex flex-col items-center justify-center py-10 text-center'>
					<CheckCircle className='mb-4 h-16 w-16 text-emerald-500' />
					<h3 className='text-xl font-medium'>Thank You!</h3>
					<p className='mt-2 text-muted-foreground'>
						Your oil Tonnage has been calculated successfully.
					</p>
				</CardContent>
			)}

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className='space-y-4'>
						{/** Volume */}
						<FormField
							control={form.control}
							name='volume'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										volume (litres) <span className='text-destructive'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter volume'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/** Density */}
						<FormField
							control={form.control}
							name='density'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										density (kg/m³) <span className='text-destructive'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter density'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/** Temperature */}
						<FormField
							control={form.control}
							name='temperature'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										temperature (°C) <span className='text-destructive'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Enter temperature'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<CardFooter>
						<Button
							type='submit'
							className='w-full mt-4  border-blue-800'
							disabled={form.formState.isSubmitting}>
							<p className='text-blue-800'>
								{form.formState.isSubmitting ? "Calculating..." : "Calculate"}
							</p>
						</Button>
					</CardFooter>
				</form>
			</FormProvider>

			<CardFooter>
				<p className='text-red-500 text-md font-bold text-center'>{error}</p>
			</CardFooter>
		</Card>
	);
}
