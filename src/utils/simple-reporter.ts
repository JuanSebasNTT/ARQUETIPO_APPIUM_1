// src/utils/simple-reporter.ts
export class SimpleReporter {
    private static logs: string[] = [];
    private static screenshots: {name: string, data: string}[] = [];

    static addLog(message: string) {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${message}`);
        console.log(`📝 ${message}`);
    }

    static async addScreenshot(name: string) {
        try {
            const screenshot = await browser.takeScreenshot();
            this.screenshots.push({ name, data: screenshot });
            this.addLog(`📸 Screenshot capturada: ${name}`);
        } catch (error) {
            this.addLog(`❌ Error capturando screenshot: ${name}`);
        }
    }

    static addError(error: string) {
        this.addLog(`🔥 ERROR: ${error}`);
    }

    static getReport() {
        return {
            logs: this.logs,
            screenshots: this.screenshots.map(s => s.name),
            timestamp: new Date().toISOString(),
            totalTests: 0, // Se llenará automáticamente
            passedTests: 0,
            failedTests: 0
        };
    }

    static clear() {
        this.logs = [];
        this.screenshots = [];
    }
}