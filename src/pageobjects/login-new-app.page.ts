import { loginSelectors } from '../selectors/login-selectors';

class LoginNewAppPage {
    
    // Método para ingresar al login
    async navigateToLogin() {
        const signInButton = await $(loginSelectors.signIn);
        await signInButton.click();
        await browser.pause(1000);
    }

    // Método para ingresar username
    async enterUsername(username: string) {
        await this.navigateToLogin();
        const usuarioField = await $(loginSelectors.usuario);
        await usuarioField.setValue(username);
    }

    // Método para ingresar password
    async enterPassword(password: string) {
        const contrasenaField = await $(loginSelectors.contrasena);
        await conttrasenaField.setValue(password);
    }

    // Método para hacer clic en login (necesitarás agregar este selector)
    async clickLogin() {
        // Asumiendo que necesitas agregar un selector para el botón de login
        const loginButton = await $('//android.widget.Button[@text="Iniciar sesión"]');
        await loginButton.click();
    }

    // Método para verificar si se muestra OTP
    async isOTPDisplayed(): Promise<boolean> {
        try {
            // Asumiendo que necesitas un selector para el campo OTP
            const otpField = await $(loginSelectors.respuesta); // Usando el selector de respuesta para OTP
            return await otpField.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    // Método para manejar errores de sesión
    async getSessionError(): Promise<string> {
        try {
            const errorElement = await $(loginSelectors.errorSesion);
            if (await errorElement.isDisplayed()) {
                return await errorElement.getText();
            }
            return '';
        } catch (error) {
            return '';
        }
    }
}

export default new LoginNewAppPage();