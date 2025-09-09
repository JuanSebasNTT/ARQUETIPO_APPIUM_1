import fs from "fs";
import path from "path";

export async function takeScreenshot(name: string) {
    const screenshotBase64 = await browser.takeScreenshot();

    const dir = path.join("reports", "screenshots");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${name}-${timestamp}.png`;
    const filePath = path.join(dir, fileName);

    fs.writeFileSync(filePath, screenshotBase64, "base64");

    // Guardamos solo la ruta relativa para que sea navegable en el reporte
    const relativePath = path.relative("reports", filePath).replace(/\\/g, "/");

    return {
        timestamp: new Date().toISOString(),
        action: `Screenshot: ${name}`,
        screenshot: relativePath // 👈 esto va directo al JSON
    };
}