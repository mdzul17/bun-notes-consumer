import nodemailer from "nodemailer"

export class MailSender {
    transporter: any

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    sendEmail(targetEmail: string, content: any) {
        const message = {
            from: "Register Test",
            to: targetEmail,
            subject: "Register Test",
            text: "Berhasil registrasi",
        };

        return this.transporter.sendMail(message);
    }
}