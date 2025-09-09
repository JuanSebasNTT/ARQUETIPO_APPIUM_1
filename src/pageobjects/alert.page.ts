// src/pageobjects/alert.page.ts
class AlertPage {
    get alertMessage() { return $('id:android:id/message'); }
    get okButton() { return $('id:android:id/button1'); }

    async isAlertDisplayed() {
        return await this.alertMessage.isDisplayed();
    }

    async getAlertText() {
        return await this.alertMessage.getText();
    }

    async closeAlert() {
        await this.okButton.click();
    }
}

export default new AlertPage();