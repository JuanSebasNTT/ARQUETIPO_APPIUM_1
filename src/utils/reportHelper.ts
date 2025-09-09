// src/utils/reportHelper.ts
import fs from 'fs';
import path from 'path';

interface Step {
    description: string;
    status: 'success' | 'error';
    timestamp: string;
    screenshot?: string;
}

interface Test {
    name: string;
    steps: Step[];
    start: string;
    end?: string;
    duration?: number;
    status: 'passed' | 'failed' | 'skipped';
}

interface Suite {
    name: string;
    tests: Test[];
    start: string;
    end?: string;
    duration?: number;
}

class ReportHelper {
    private suites: Suite[] = [];
    private currentSuite?: Suite;
    private currentTest?: Test;
    private reportPath: string;

    constructor(filename: string = 'appium-report.html') {
        this.reportPath = path.join(process.cwd(), 'reports', filename);
        this.ensureReportsDirectory();
    }

    private ensureReportsDirectory() {
        const reportsDir = path.dirname(this.reportPath);
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
    }

    startSuite(name: string) {
        this.currentSuite = { 
            name, 
            tests: [], 
            start: new Date().toISOString() 
        };
        this.suites.push(this.currentSuite);
        console.log(`📋 Suite iniciada: ${name}`);
    }

    endSuite() {
        if (this.currentSuite) {
            this.currentSuite.end = new Date().toISOString();
            this.currentSuite.duration = new Date(this.currentSuite.end).getTime() - 
                                        new Date(this.currentSuite.start).getTime();
            this.generateReport();
            this.currentSuite = undefined;
        }
    }

    startTest(name: string) {
        if (!this.currentSuite) throw new Error('No suite started');
        this.currentTest = { 
            name, 
            steps: [], 
            start: new Date().toISOString(),
            status: 'passed'
        };
        this.currentSuite.tests.push(this.currentTest);
    }

    endTest() {
        if (this.currentTest) {
            this.currentTest.end = new Date().toISOString();
            this.currentTest.duration = new Date(this.currentTest.end).getTime() - 
                                       new Date(this.currentTest.start).getTime();
            this.currentTest = undefined;
        }
    }

    addStep(description: string, status: 'success' | 'error' = 'success', screenshot?: string) {
        if (!this.currentTest) throw new Error('No test started');
        
        const step: Step = {
            description,
            status,
            timestamp: new Date().toISOString(),
            screenshot
        };
        
        this.currentTest.steps.push(step);
        
        if (status === 'error') {
            this.currentTest.status = 'failed';
        }
    }

    private generateReport() {
        // ... (código del reporte HTML que te proporcioné anteriormente)
        // Mantener el mismo código de generación de HTML
    }
}

export default new ReportHelper();