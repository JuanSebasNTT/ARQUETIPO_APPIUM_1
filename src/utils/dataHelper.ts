import path from 'path';
import ExcelJS from 'exceljs';

export class DataHelper {
    static async loadTestDataFromExcel(fileName: string, sheetName: string): Promise<any[]> {
        const filePath = path.join(process.cwd(), 'src', 'data', fileName);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet ${sheetName} not found in ${fileName}`);
        }

        const data: any[] = [];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber === 1) return; // Saltar encabezado

            // row.values puede ser undefined o un objeto extraño, asegurar que es array
            const values = Array.isArray(row.values) ? row.values : Object.values(row.values || {});
            const [type, username, password, expectedMessage] = values.slice(1); // slice(1) porque exceljs es 1-indexed
            data.push({ type, username, password, expectedMessage });
        });

        return data;
    }
}