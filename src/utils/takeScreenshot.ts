import fs from "fs";
import path from "path";

const dir = path.join("reports", "screenshots");

export async function takeScreenshot(name: string) {
    // Captura en base64
    const base64 = await browser.takeScreenshot();

    // Crear carpeta si no existe
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Generar nombre del archivo
    const fileName = `${Date.now()}-${name}.png`;
    const filePath = path.join(dir, fileName);

    // Guardar archivo físico
    fs.writeFileSync(filePath, base64, "base64");

    // Retornar objeto para JSON
    return {
        timestamp: new Date().toISOString(),
        action: `Screenshot: ${name}`,
        screenshot: filePath.replace(/\\/g, "/"), // ruta relativa amigable
        base64 // ⚡ ya va directo al HTML
    };
}