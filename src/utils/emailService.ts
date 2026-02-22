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

const formatName = (name: string) => {
    return name.split(" ").map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
    ). join(" ");
};


export const welcomeTemplate = (name: string) => {
  const formattedName = formatName(name);

  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">

      <h2 style="color: #2c3e50; text-align: center;">
        Welcome to CareXpert, ${formattedName}!
      </h2>

      <p style="font-size: 16px; color: #555;">
        We're excited to have you on board 🎉
      </p>

      <p style="font-size: 15px; color: #555;">
        CareXpert connects patients and doctors seamlessly through:
      </p>

      <ul style="font-size: 14px; color: #555;">
        <li>📅 Easy appointment booking</li>
        <li>💬 Real-time chat</li>
        <li>🎥 Video consultations</li>
        <li>📄 Digital prescriptions</li>
      </ul>

      <p style="font-size: 15px; color: #555;">
        You can now log in and start managing your healthcare efficiently.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="#"
           style="background-color: #3498db; 
                  color: white; 
                  padding: 12px 20px; 
                  text-decoration: none; 
                  border-radius: 5px;
                  font-weight: bold;">
          Login to CareXpert
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #999; text-align: center;">
        If you did not create this account, please ignore this email.
      </p>

      <p style="font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} CareXpert. All rights reserved.
      </p>

    </div>
  </div>
  `;
};

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