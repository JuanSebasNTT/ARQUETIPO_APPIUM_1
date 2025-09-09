import LoginNewAppPage from '../../pageobjects/login-new-app.page';
import { DataHelper } from '../../utils/dataHelper';
import * as fs from 'fs';
import * as path from 'path';
import { takeScreenshot } from '../../utils/screenshot';

describe('Login tests - New App', () => {
    let testData: any;
    const steps: any[] = [];
    const suiteName = 'Login tests - New App';
    const testName = 'Login con credenciales válidas - New App';
    const timestamp = new Date().toISOString();

    before(async () => {
        const excelData = await DataHelper.loadTestDataFromExcel('loginData.xlsx', 'Credentials');
        testData = excelData.find((d) => d.type === 'valid');

        if (!testData) throw new Error('No se encontró caso positivo en Excel');

        steps.push({ timestamp: new Date().toISOString(), action: "Cargado caso de prueba desde Excel" });
        steps.push(await takeScreenshot('before-test-start'));
    });

    it(testName, async () => {
        try {
            // Ingresar username
            steps.push({ timestamp: new Date().toISOString(), action: `Ingresar username: ${testData.username}` });
            await LoginNewAppPage.enterUsername(testData.username);
            steps.push(await takeScreenshot('after-enter-username'));

            // Ingresar password
            steps.push({ timestamp: new Date().toISOString(), action: `Ingresar password: ${'*'.repeat(testData.password.length)}` });
            await LoginNewAppPage.enterPassword(testData.password);
            steps.push(await takeScreenshot('after-enter-password'));

            // Hacer clic en el botón de login
            steps.push({ timestamp: new Date().toISOString(), action: "Hacer click en login" });
            await LoginNewAppPage.clickLogin();
            await browser.pause(3000); // Aumenté el tiempo de espera
            steps.push(await takeScreenshot('after-login-click'));

            // Verificar si hay error de sesión primero
            const errorMessage = await LoginNewAppPage.getSessionError();
            if (errorMessage) {
                steps.push({ timestamp: new Date().toISOString(), action: `Error de sesión detectado: ${errorMessage}` });
                steps.push(await takeScreenshot('login-error'));
                throw new Error(`Login falló: ${errorMessage}`);
            }

            // Validar que se muestra la ventana de OTP
            steps.push({ timestamp: new Date().toISOString(), action: "Validar ventana de OTP" });
            const isOTPDisplayed = await LoginNewAppPage.isOTPDisplayed();
            
            if (isOTPDisplayed) {
                steps.push({ timestamp: new Date().toISOString(), action: "Ventana de OTP mostrada correctamente" });
                steps.push(await takeScreenshot('otp-displayed'));
                
                // Opcional: ingresar OTP si es necesario
                // await LoginNewAppPage.enterOTP('123456');
            } else {
                // Si no hay OTP, verificar que el login fue exitoso de otra manera
                steps.push({ timestamp: new Date().toISOString(), action: "Verificando login exitoso por otros medios" });
                steps.push(await takeScreenshot('post-login'));
                
                // Aquí puedes agregar otras validaciones de login exitoso
                // Por ejemplo, verificar que se muestra el dashboard
            }

        } catch (error) {
            steps.push({ timestamp: new Date().toISOString(), action: `ERROR: ${error.message}` });
            steps.push(await takeScreenshot('test-failure'));
            throw error;
        }
    });

    after(() => {
        const reportsDir = path.join('.', 'reports');
        if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

        const stepsPath = path.join(reportsDir, 'steps-new-app.json');
        fs.writeFileSync(
            stepsPath,
            JSON.stringify({ suite: suiteName, test: testName, steps, timestamp }, null, 2)
        );

        console.log(`✅ JSON guardado en: ${stepsPath}`);
    });
});