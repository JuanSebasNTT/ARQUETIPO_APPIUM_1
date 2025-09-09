// src/utils/otpHelper.ts
import { GuerrillaMailService } from './guerrillaMailService';

export class OTPHelper {
    private static guerrillaService: GuerrillaMailService;

    static async initialize(): Promise<string> {
        this.guerrillaService = new GuerrillaMailService();
        return await this.guerrillaService.getEmailAddress();
    }

    static async getOTPFromEmail(): Promise<string> {
        if (!this.guerrillaService) {
            throw new Error('GuerrillaMailService no inicializado. Llama a initialize() primero.');
        }

        return await this.guerrillaService.waitForOTP();
    }
}