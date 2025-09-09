import fs from "fs";
import path from "path";

interface Step {
    timestamp: string;
    action: string;
    screenshot?: string;
}

interface Report {
    suite: string;
    test: string;
    timestamp: string;
    steps: Step[];
}

// Función para escapar caracteres HTML especiales
function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (match) => {
        const escapeMap: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

export class HtmlGenerator {
    static generateFromJson(jsonFile: string, outputFile: string): void {
        try {
            const raw: string = fs.readFileSync(jsonFile, "utf-8");
            const report: Report = JSON.parse(raw);

            const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>📊 Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
        h1 { color: #2c3e50; }
        .box { border: 1px solid #ccc; background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .passed { color: green; font-weight: bold; }
        .failed { color: red; font-weight: bold; }
        .step { margin: 10px 0; }
        .timestamp { font-size: 0.85em; color: gray; }
        img { max-width: 500px; border: 1px solid #ddd; border-radius: 4px; margin-top: 8px; display: block; }
    </style>
</head>
<body>
    <h1>📊 Reporte de Pruebas</h1>
    <div class="box">
        <h2>📂 Suite: ${escapeHtml(report.suite)}</h2>
        <h3>🧪 Test: ${escapeHtml(report.test)}</h3>
        <p class="timestamp">⏱️ Ejecutado en: ${escapeHtml(report.timestamp)}</p>
    </div>

    <div class="box">
        <h2>📜 Pasos ejecutados</h2>
        ${report.steps.map((step: Step) => {
            let screenshotTag = "";
            if (step.screenshot) {
                try {
                    const screenshotPath = path.resolve(step.screenshot);
                    if (fs.existsSync(screenshotPath)) {
                        const imgBase64 = fs.readFileSync(screenshotPath, "base64");
                        screenshotTag = `<img src="data:image/png;base64,${imgBase64}" alt="screenshot"/>`;
                    } else {
                        console.warn(`⚠️ Imagen no encontrada: ${screenshotPath}`);
                    }
                } catch (error) {
                    console.error(`❌ Error leyendo imagen ${step.screenshot}:`, error);
                }
            }

            return `
                <div class="step">
                    <p>➡️ ${escapeHtml(step.action)} <span class="timestamp">(${escapeHtml(step.timestamp)})</span></p>
                    ${screenshotTag}
                </div>
            `;
        }).join("")}
    </div>
</body>
</html>`;

            // Crear directorio de salida si no existe
            const outputDir = path.dirname(outputFile);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(outputFile, html, "utf-8");
            console.log(`✅ Reporte HTML generado en: ${outputFile}`);
        } catch (err) {
            console.error("❌ Error generando reporte:", err);
        }
    }
}
