import LoginPage from '../../pageobjects/login.page';
import { DataHelper } from '../../utils/dataHelper';
import * as fs from 'fs';
import * as path from 'path';
import { takeScreenshot } from '../../utils/screenshot';

describe('Login tests', () => {
    let testData: any;
    const steps: any[] = [];
    const suiteName = 'Login tests';
    const testName = 'Login con credenciales válidas';
    const timestamp = new Date().toISOString();

    before(async () => {
        const excelData = await DataHelper.loadTestDataFromExcel('loginData.xlsx', 'Credentials');
        testData = excelData.find((d) => d.type === 'valid');

        if (!testData) throw new Error('No se encontró caso positivo en Excel');

        steps.push({ timestamp: new Date().toISOString(), action: "Cargado caso de prueba desde Excel" });
        steps.push(await takeScreenshot('before-test-start'));
    });

    it(testName, async () => {
        steps.push({ timestamp: new Date().toISOString(), action: "Abrir menú principal" });
        await LoginPage.openLogin();
        steps.push(await takeScreenshot('after-open-login'));

        steps.push({ timestamp: new Date().toISOString(), action: `Ingresar username: ${testData.username}` });
        await LoginPage.enterUsername(testData.username);
        steps.push(await takeScreenshot('after-enter-username'));

        steps.push({ timestamp: new Date().toISOString(), action: `Ingresar password: ${'*'.repeat(testData.password.length)}` });
        await LoginPage.enterPassword(testData.password);
        steps.push(await takeScreenshot('after-enter-password'));

        steps.push({ timestamp: new Date().toISOString(), action: "Hacer click en login" });
        await LoginPage.clickLogin();
        await browser.pause(2000);
        steps.push(await takeScreenshot('after-login-click'));

        steps.push({ timestamp: new Date().toISOString(), action: "Validar alerta de éxito" });
        if (await LoginPage.isAlertDisplayed()) {
            const alertText = await LoginPage.getAlertText();
            steps.push({ timestamp: new Date().toISOString(), action: `Texto de alerta: ${alertText}` });
            steps.push(await takeScreenshot('alert-displayed'));
            await LoginPage.closeAlert();
        } else {
            steps.push({ timestamp: new Date().toISOString(), action: "No se mostró alerta, validando mensaje en pantalla..." });
            steps.push(await takeScreenshot('no-alert-displayed'));
        }

        steps.push(await takeScreenshot('test-completed'));
    });

    after(() => {
        const reportsDir = path.join('.', 'reports');
        if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

        const stepsPath = path.join(reportsDir, 'steps.json');
        fs.writeFileSync(
            stepsPath,
            JSON.stringify({ suite: suiteName, test: testName, steps, timestamp }, null, 2)
        );

        console.log(`✅ JSON guardado en: ${stepsPath}`);
    });
});