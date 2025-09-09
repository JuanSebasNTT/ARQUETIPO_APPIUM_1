// src/utils/guerrillaMailService.ts
import axios from 'axios';
import * as querystring from 'querystring';

export class GuerrillaMailService {
    private baseUrl = 'https://api.guerrillamail.com/ajax.php';
    private sidToken: string | null = null;
    private emailAddress: string | null = null;

    // Obtener una dirección de email temporal
    async getEmailAddress(): Promise<string> {
        try {
            const response = await axios.get(`${this.baseUrl}?f=get_email_address`);
            this.sidToken = response.data.sid_token;
            this.emailAddress = response.data.email_addr;
            return this.emailAddress;
        } catch (error) {
            console.error('Error obteniendo dirección de email:', error);
            throw error;
        }
    }

    // Verificar emails recibidos
    async checkEmails(): Promise<any[]> {
        if (!this.sidToken) {
            throw new Error('SID token no disponible. Primero obtén una dirección de email.');
        }

        try {
            const response = await axios.get(
                `${this.baseUrl}?f=check_email&sid_token=${this.sidToken}`
            );
            return response.data.list;
        } catch (error) {
            console.error('Error verificando emails:', error);
            throw error;
        }
    }

    // Obtener el contenido de un email específico
    async getEmail(emailId: string): Promise<string> {
        if (!this.sidToken) {
            throw new Error('SID token no disponible.');
        }

        try {
            const response = await axios.get(
                `${this.baseUrl}?f=fetch_email&sid_token=${this.sidToken}&email_id=${emailId}`
            );
            return response.data.mail_body;
        } catch (error) {
            console.error('Error obteniendo email:', error);
            throw error;
        }
    }

    // Extraer código OTP del cuerpo del email
    extractOTPFromEmail(emailBody: string): string | null {
        // Buscar patrones comunes de OTP (6 dígitos)
        const otpPattern = /\b\d{6}\b/;
        const match = emailBody.match(otpPattern);
        return match ? match[0] : null;
    }

    // Esperar y obtener el OTP
    async waitForOTP(timeout: number = 120000, interval: number = 5000): Promise<string> {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            const emails = await this.checkEmails();
            
            if (emails.length > 0) {
                // Buscar el email más reciente que probablemente contenga el OTP
                const latestEmail = emails[0];
                const emailBody = await this.getEmail(latestEmail.mail_id);
                const otp = this.extractOTPFromEmail(emailBody);
                
                if (otp) {
                    return otp;
                }
            }
            
            // Esperar antes de verificar nuevamente
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        
        throw new Error('No se recibió el OTP dentro del tiempo esperado');
    }
}