# Edible Oil Tonnage Calculator

A web application that calculates the tonnage (MT) of edible oil based on user-submitted volume, density, and temperature. It retrieves the Volume Correction Factor (VCF) from a lookup table and stores the calculation history.


## Formula

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```Tonnage (MT) = (Volume × Density × VCF) / 1000
```
- Volume in litres
- Density in kg/m³
- VCF is retrieved from a table based on rounded density and temperature

## Tech Stack
- Frontend: React (with TailwindCSS)
- Backend: Node.js + Express (or any Node server)
- ORM: Prisma
- Database: MySQL
- Validation: Zod + React Hook Form

## Installation
```
 git clone https://github.com/your-username/edible-oil-calculator.git
 cd edible-oil-calculator
 npm install
```

## Prisma Setup
 Initialize Prisma (if not already done)
 ```
npx prisma init
```
### update database credentials in .env
```
DATABASE_URL="mysql://username:password@localhost:3306/your_db_name"
```
run prisma Prisma models Inside prisma/schema.prisma
```
npx prisma migrate dev --name init
```

## setup sample data
```
mysql -u root -p your_db_name < vcftable.sql
```

## 🚀 Running the App
```
node server.js
npm run dev
```

## Features
- ✅ Validates user inputs using Zod and React Hook Form
- ✅ Rounds inputs to nearest allowed VCF values (0.5 kg/m³ and 0.25 °C)
- ✅ Stores each calculation in the database
- ✅ Displays VCF and tonnage after calculation
- ✅ Historical log with sort & search (optional)

## Project Structure
```
.
├── src/                # React frontend
│   └── ...
├  prisma/   # Prisma backend
│       └── schema.prisma
│   └── ...
└── vcftable.sql           # VCF sample data to import

```
