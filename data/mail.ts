import Mail from "nodemailer/lib/mailer";
import {transport} from "@/lib/mail";

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationUrl = `http://localhost:3000/auth/new-verification?token=${token}`;

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: `Bevestig uw emailadres`,
        html: `<p>Bevestig uw emailadres klik <a href="${confirmationUrl}">hier</a> om je mailadress te bevestigen</p> <br>`

    };

    await transport.sendMail(mailOptions);
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `http://localhost:3000/auth/new-password?token=${token}`;

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: `Wachtwoord reset`,
        html: `<p>Wachtwoord reset klik <a href="${resetUrl}">hier</a> om je wachtwoord te resetten</p> <br>`

    };

    await transport.sendMail(mailOptions);
}