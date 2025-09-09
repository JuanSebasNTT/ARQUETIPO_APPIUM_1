import fs from "fs";
import path from "path";

function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/[&<>"']/g, (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[m]);
}

function readStepsData() {
    try {
        const stepsPath = path.resolve("reports", "steps.json");
        if (fs.existsSync(stepsPath)) {
            const raw = fs.readFileSync(stepsPath, "utf-8");
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error("Error leyendo datos de pasos:", err);
    }
    return {};
}

export class HtmlGenerator {
    static generateFromJson(jsonFile, outputFile) {
        try {
            const jsonPath = path.resolve(jsonFile);
            if (!fs.existsSync(jsonPath)) {
                console.error(`❌ Archivo JSON no encontrado: ${jsonPath}`);
                return;
            }

            const raw = fs.readFileSync(jsonPath, "utf-8");
            const report = JSON.parse(raw);
            const stepsData = readStepsData();

            const outputPath = path.resolve(outputFile);
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>📊 Test Report - Mocha</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
        h1 { color: #2c3e50; }
        .box { border: 1px solid #ccc; background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .suite { margin: 20px 0; }
        .test { margin: 15px 0; padding: 10px; border-left: 4px solid #ddd; }
        .passed { border-left-color: #28a745; }
        .failed { border-left-color: #dc3545; }
        .step { margin: 10px 0; }
        .timestamp { font-size: 0.85em; color: gray; }
        a.screenshot-link { display: inline-block; margin-top: 5px; color: #007bff; text-decoration: none; }
        a.screenshot-link:hover { text-decoration: underline; }
        .stats { display: flex; gap: 20px; margin: 20px 0; }
        .stat { padding: 10px; border-radius: 5px; color: white; }
        .stat-passed { background: #28a745; }
        .stat-failed { background: #dc3545; }
        .stat-skipped { background: #6c757d; }
    </style>
</head>
<body>
    <h1>📊 Reporte de Pruebas - Mocha</h1>

    <div class="stats">
        <div class="stat stat-passed">✅ Pasados: ${report.state?.passed || 0}</div>
        <div class="stat stat-failed">❌ Fallados: ${report.state?.failed || 0}</div>
        <div class="stat stat-skipped">⏭️ Saltados: ${report.state?.skipped || 0}</div>
    </div>

    <p class="timestamp">⏰ Inicio: ${escapeHtml(report.start || "")}</p>
    <p class="timestamp">⏱️ Fin: ${escapeHtml(report.end || "")}</p>`;

            // Suite
            if (report.suites && report.suites.length > 0) {
                report.suites.forEach((suite) => {
                    htmlContent += `
    <div class="suite box">
        <h2>📂 Suite: ${escapeHtml(suite.name)}</h2>
        <p class="timestamp">⏱️ Duración: ${suite.duration}ms</p>`;

                    if (suite.tests && suite.tests.length > 0) {
                        suite.tests.forEach((test) => {
                            htmlContent += `
        <div class="test ${test.state}">
            <h3>🧪 Test: ${escapeHtml(test.name)}</h3>
            <p class="timestamp">⏱️ Duración: ${test.duration}ms</p>
            <p>Estado: ${test.state === "passed" ? "✅ PASADO" : "❌ FALLIDO"}</p>`;

                            // Pasos con links clickeables
                            if (stepsData.steps && stepsData.steps.length > 0) {
                                htmlContent += `
            <h4>📝 Pasos ejecutados:</h4>
            <div class="steps">`;

                                stepsData.steps.forEach((step) => {
                                    let screenshotTag = "";
                                    if (step.screenshot) {
                                        screenshotTag = `<a href="${step.screenshot}" target="_blank" class="screenshot-link">📷 Ver Screenshot</a>`;
                                    }

                                    htmlContent += `
                <div class="step">
                    <p>➡️ ${escapeHtml(step.action)} <span class="timestamp">(${escapeHtml(step.timestamp)})</span></p>
                    ${screenshotTag}
                </div>`;
                                });

                                htmlContent += `</div>`;
                            }

                            htmlContent += `
        </div>`;
                        });
                    }

                    htmlContent += `
    </div>`;
                });
            }

            htmlContent += `
</body>
</html>`;

            fs.writeFileSync(outputPath, htmlContent, "utf-8");
            console.log(`✅ Reporte HTML generado en: ${outputPath}`);
        } catch (err) {
            console.error("❌ Error generando reporte:", err);
        }
    }
}

// CLI
if (process.argv.length >= 3) {
    const input = process.argv[2];
    const output = process.argv[3] || path.join("reports", "appium-report.html");
    HtmlGenerator.generateFromJson(input, output);
} else {
    const defaultInput = path.join("reports", "json", "test-results.json");
    const defaultOutput = path.join("reports", "appium-report.html");
    console.log(`⚠️ Usando archivo por defecto: ${defaultInput}`);
    HtmlGenerator.generateFromJson(defaultInput, defaultOutput);
}