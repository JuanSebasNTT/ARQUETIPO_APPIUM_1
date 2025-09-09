import { $ } from '@wdio/globals';

class LoginPage {
    // Elementos - SIN ChainablePromiseElement
    get menuIcon() {
        return $('-android uiautomator:new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    get loginButton() {
        return $('~Login');
    }

    get usernameInput() {
        return $('~input-email');
    }

    get passwordInput() {
        return $('~input-password');
    }

    get loginSubmit() {
        return $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(15)');
    }

    get alertMessage() {
    // Cambiar de:
    // return $('android:id/message'); // ❌ CSS inválido
    
    // A:
    return $('~android:id/message'); // ✅ Accessibility id
    // O:
    return $('//*[@resource-id="android:id/message"]'); // ✅ XPath
}

    get alertOk() {
        // Cambiar de:
        // return $('android:id/button1'); // ❌ CSS inválido
        
        // A:
        return $('~android:id/button1'); // ✅ Accessibility id  
        // O:
        return $('//*[@resource-id="android:id/button1"]'); // ✅ XPath
    }

    // Acciones
    async openLogin() {
        await (await this.menuIcon).click();
        await (await this.loginButton).click();
    }

    async enterUsername(username: string) {
        // DEBUG: Verificar el valor recibido
        console.log('DEBUG enterUsername - username:', username, 'type:', typeof username);
        
        // Conversión explícita a string
        const usernameStr = String(username);
        console.log('DEBUG enterUsername - usernameStr:', usernameStr, 'type:', typeof usernameStr);
        
        const input = await this.usernameInput;
        await input.waitForDisplayed({ timeout: 15000 });
        await input.clearValue();
        
        // Usar keys() en lugar de setValue() para evitar el error
        await input.click(); // Hacer focus primero
        await browser.keys(usernameStr); // Enviar tecla por tecla
    }

    async enterPassword(password: string) {
        // DEBUG: Verificar el valor recibido
        console.log('DEBUG enterPassword - password:', '*'.repeat(password.length), 'type:', typeof password);
        
        // Conversión explícita a string
        const passwordStr = String(password);
        
        const input = await this.passwordInput;
        await input.waitForDisplayed({ timeout: 15000 });
        await input.clearValue();
        
        // Usar keys() en lugar de setValue()
        await input.click(); // Hacer focus primero
        await browser.keys(passwordStr); // Enviar tecla por tecla
    }

    async clickLogin() {
        await (await this.loginSubmit).click();
    }

    async isAlertDisplayed(): Promise<boolean> {
        try {
            const alert = await this.alertMessage;
            return await alert.isDisplayed({ timeout: 15000 });
        } catch (error) {
            return false;
        }
    }

    async getAlertText(): Promise<string> {
        const alert = await this.alertMessage;
        return await alert.getText();
    }

    async closeAlert() {
        await (await this.alertOk).click();
    }
}

export default new LoginPage();