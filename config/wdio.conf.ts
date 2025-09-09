// config/wdio.conf.ts
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';

export const config = {
    // ====================
    // BrowserStack Config
    // ====================
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    // ====================
    // TypeScript Support
    // ====================
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    },

    // ====================
    // Specs and Capabilities
    // ====================
    specs: [
        './src/test/specs/**/*.test.ts',
        './src/test/specs/**/*.testti.ts' 

    ],

    maxInstances: 1,

    capabilities: [{   
        platformName: 'Android',
        'appium:deviceName': 'Google Pixel 7',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': 'bs://5dc138d1225e99dab2be5ab3bae3ffd3523af356',
        'bstack:options': {
            projectName: 'My Appium Project',
            buildName: `Build - ${new Date().toLocaleDateString()}`,
            appiumVersion: '2.0.1'
        }
    }],

    // ====================
    // Test Framework
    // ====================
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    // ====================
    // Timeouts
    // ====================
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ====================
    // Services
    // ====================
    services: ['browserstack'],

    // ====================
    // Logging
    // ====================
    logLevel: 'info',

    // ====================
    // Reporters
    // ====================
    reporters: [
        'spec',
        ['json', {
            outputDir: './reports/json/',
            outputFileFormat: function() {
                return `test-results.json`;
            }
        }]
    ],

    // ====================
    // Hooks
    // ====================
    onPrepare: function() {
        // Crear directorios necesarios
        const reportsDir = path.join(process.cwd(), 'reports');
        const jsonDir = path.join(reportsDir, 'json');
        
        if (!existsSync(reportsDir)) {
            mkdirSync(reportsDir, { recursive: true });
        }
        if (!existsSync(jsonDir)) {
            mkdirSync(jsonDir, { recursive: true });
        }
        console.log('📁 Directorios de reportes listos');
    },

    onComplete: function() {
        console.log('✅ Tests completados!');
        console.log('📊 JSON results disponibles en: ./reports/json/test-results.json');
        console.log('🚀 Ejecuta "npm run report:html" para generar el reporte HTML');
    }
};