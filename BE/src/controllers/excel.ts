import { PrismaClient } from "@prisma/client";
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export const excelPersonGenerator = async (req, res) => {
    try {
        // Recupera i dati dal database
        const persons = await prisma.person.findMany({
          where:{
            role: "ADMIN"
          }
        });

        // Crea un nuovo workbook
        const wb = XLSX.utils.book_new();

        // Converte i dati in un worksheet
        const ws = XLSX.utils.json_to_sheet(persons);

        // Aggiunge il worksheet al workbook
        XLSX.utils.book_append_sheet(wb, ws, "Persons");

        // Scrive il workbook in un file
        const filename = "persons.xlsx";
        XLSX.writeFile(wb, filename);

        // Restituisce il file come risposta
        res.download(filename);
    } catch (error) {
      console.error(error);
      res.status(418).json({ message: "Internal server error" });
    }
};

export const excelCarGenerator = async (req, res) => {
  try {
      // Recupera i dati dal database
      const cars = await prisma.car.findMany();

      // Crea un nuovo workbook
      const wb = XLSX.utils.book_new();

      // Inizializza un nuovo worksheet
      const ws = XLSX.utils.aoa_to_sheet([]);

      // Aggiunge le intestazioni di colonna al worksheet
      XLSX.utils.sheet_add_aoa(ws, [["ID", "LicensePlate", "Model", "RefersTo"]], {origin: 'A1'});

      // Aggiunge i dati al worksheet
      cars.forEach((car, index) => {
          XLSX.utils.sheet_add_aoa(ws, [[car.id, car.plates, car.model, car.person_id]], {origin: `A${index + 2}`});
      });

      // Aggiunge il worksheet al workbook
      XLSX.utils.book_append_sheet(wb, ws, "Cars");

      // Scrive il workbook in un file
      const filename = "cars.xlsx";
      XLSX.writeFile(wb, filename);

      // Restituisce il file come risposta
      res.download(filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const excelPointGenerator = async (req, res) => {
    try {
        // Recupera i dati dal database
        const points = await prisma.point.findMany();

        // Crea un nuovo workbook
        const wb = XLSX.utils.book_new();

        // Converte i dati in un worksheet
        const ws = XLSX.utils.json_to_sheet(points);

        // Aggiunge il worksheet al workbook
        XLSX.utils.book_append_sheet(wb, ws, "Points");

        // Scrive il workbook in un file
        const filename = "points.xlsx";
        XLSX.writeFile(wb, filename);

        // Restituisce il file come risposta
        res.download(filename);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
};
