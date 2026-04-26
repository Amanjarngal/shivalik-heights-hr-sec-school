import { Resend } from 'resend';

let resend;

const getResendClient = () => {
    if (!resend) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not defined in environment variables");
        }
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

const sendEmail = async (options) => {
    try {
        let recipient = options.email;
        
        // Development Mode Redirect: Intercept emails to unverified recipients
        if (process.env.NODE_ENV === 'development') {
            const adminEmail = process.env.ADMIN_EMAIL;
            if (adminEmail && recipient !== adminEmail) {
                console.log(`Resend Service: [DEV MODE] Redirecting email from ${recipient} to ${adminEmail}`);
                recipient = adminEmail;
            }
        }

        console.log(`Resend Service: Sending email to ${recipient}`);
        
        const client = getResendClient();
        const data = await client.emails.send({
            from: 'NPHSS Admission <onboarding@resend.dev>', // Update with verified domain in production
            to: recipient,
            subject: options.subject,
            html: options.message,
        });

        if (data.error) {
            throw new Error(data.error.message);
        }

        console.log("Resend: Email sent successfully!", data.data?.id);
        return data.data;
    } catch (error) {
        console.error("Resend Error:", error);
        throw new Error(`Email sending failed: ${error.message}`);
    }
};

export default sendEmail;
