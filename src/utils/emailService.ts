import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }, 
});

export const sendEmailAsync = (
    to: string,
    subject: string,
    html: string
) => {

    setImmediate(async () => {
        try {
            
            await transporter.sendMail({
                from: process.env.SMTP_FROM,
                to,
                subject,
                html,
            });
        } catch (error) {
            console.error("Email error: ", error);
        }
    });
};


export const welcomeTemplate = (name: string) => `
<h2>Welcome to CareXpert, ${name}!</h2>
<p>Your account has been successfully created.</p>
`;

export const appointmentTemplate = (
    name: string,
    status: string 
) => `
<h3>Hello ${name},</h3>
<p>Your appointment has been <strong>${status}</strong>.</p>
`;

export const prescriptionTemplate = (name: string) => `
  <h3>Hello ${name},</h3>
  <p>Your prescription is now available in your dashboard.</p>
`;