import fs from "fs";
import path from "path";

class JsonReporterHelper {
    private static results: any = {
        metadata: {
            createdAt: new Date().toLocaleString(),
            environment: {
                browser: process.env.BROWSER || "Unknown",
                platform: process.env.PLATFORM || "Unknown",
                device: process.env.DEVICE || "Unknown",
                app: process.env.APP || "Unknown",
                description: process.env.DESCRIPTION || "Test Execution"
            }
        },
        suites: []
    };

    static startSuite(suiteName: string) {
        this.results.suites.push({ name: suiteName, tests: [] });
    }

    static addTest(
        suiteName: string,
        testName: string,
        status: "passed" | "failed" | "skipped",
        steps: any[] = []
    ) {
        const suite = this.results.suites.find((s: any) => s.name === suiteName);
        if (!suite) return;
        suite.tests.push({
            name: testName,
            status: status,
            steps: steps
        });
    }

    static addStep(
        suiteName: string,
        testName: string,
        description: string,
        status: "passed" | "failed" | "info",
        screenshots: string[] = []
    ) {
        const suite = this.results.suites.find((s: any) => s.name === suiteName);
        if (!suite) return;

        const test = suite.tests.find((t: any) => t.name === testName);
        if (!test) return;

        if (!test.steps) test.steps = [];

        test.steps.push({
            description,
            status,
            timestamp: new Date().toLocaleTimeString(),
            screenshots
        });
    }

    static saveResults() {
        const dir = path.join("reports", "json");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, "test-results.json");
        fs.writeFileSync(filePath, JSON.stringify(this.results, null, 2), "utf-8");
        console.log("✅ JSON de resultados guardado en", filePath);
    }
}

export default JsonReporterHelper;