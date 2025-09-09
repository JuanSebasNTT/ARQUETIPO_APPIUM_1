import { $ } from '@wdio/globals';

class LoginNewAppPage {
    // Selectores específicos de la nueva aplicación
    get usuarioInput() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText');
    }

    get contrasenaInput() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText');
    }

    get ingresarButton() {
        return $('//android.widget.Button[@text="Ingresar"]');
    }

    get codigoConfirmacion() {
        return $('//android.widget.TextView[@text="Código de confirmación"]');
    }

    // Acciones
    async enterUsername(username: string) {
        const input = await this.usuarioInput;
        await input.waitForDisplayed({ timeout: 60000 });
        await input.clearValue();
        await input.click();
        await browser.keys(username);
    }

    async enterPassword(password: string) {
        const input = await this.contrasenaInput;
        await input.waitForDisplayed({ timeout: 60000 });
        await input.clearValue();
        await input.click();
        await browser.keys(password);
    }

    async clickLogin() {
        const button = await this.ingresarButton;
        await button.waitForDisplayed({ timeout: 60000 });
        await button.click();
    }

    async isOTPDisplayed(): Promise<boolean> {
        try {
            const otpScreen = await this.codigoConfirmacion;
            return await otpScreen.waitForDisplayed({ timeout: 60000 });
        } catch (error) {
            return false;
        }
    }
}

export default new LoginNewAppPage();