import express from "express";
import cors from "cors";
import { PrismaClient } from "./src/generated/prisma/index.js";

const prisma = new PrismaClient();
const app = express();

var corsOptionsGeneral = {
	methods: ["GET", "POST"],
	origin: "http://localhost:5173",
	allowedHeaders: ["content-type"],
	optionsSuccessStatus: 200,
	credentials: true,
};
app.use(cors(corsOptionsGeneral));
app.use(express.json());

app.get("/api/data", async (req, res) => {
	try {
		const data = await prisma.oil_tonnages.findMany();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/calculate-tonnage", async (req, res) => {
	try {
		const { volume, density, temperature } = req.body;

		const roundedDensity = Math.round(density * 2) / 2;
		const roundedTemperature = Math.round(temperature * 4) / 4;

		const vcfRecord = await prisma.vcftable.findFirst({
			where: {
				density: roundedDensity,
				temperature: roundedTemperature,
			},
		});

		if (!vcfRecord) {
			return res.status(404).json({ error: "VCF not found" });
		}

		const vcf = vcfRecord.vcf;
		const tonnage = (volume * density * vcf) / 1000;

		const record = await prisma.oil_tonnages.create({
			data: { volume, density, temperature, vcf, tonnage },
		});

		res.json({ success: true, tonnage, record });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

app.listen(3001, () => {
	console.log("Backend running at http://localhost:3001");
});
