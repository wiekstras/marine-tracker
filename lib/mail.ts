import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    host: "smtp.transip.email",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
});