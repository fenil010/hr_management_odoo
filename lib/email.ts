import nodemailer from "nodemailer";
import { Resend } from "resend";

// Check which email provider is configured
function getEmailProvider(): "resend" | "smtp" | "gmail" | "none" {
  if (process.env.RESEND_API_KEY) {
    return "resend";
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return "smtp";
  }
  if (process.env.SMTP_USER && process.env.SMTP_PASSWORD && !process.env.SMTP_HOST) {
    return "gmail";
  }
  return "none";
}

// Create Resend client
function createResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

// Create nodemailer transporter
function createNodemailerTransporter() {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT || "587";
  const SMTP_SECURE = process.env.SMTP_SECURE === "true";
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

  // Custom SMTP
  if (SMTP_HOST && SMTP_USER && SMTP_PASSWORD) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  // Gmail SMTP (simplified)
  if (SMTP_USER && SMTP_PASSWORD) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return null;
}

// Generate HTML email template
function getOTPEmailHTML(name: string, otp: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Email Verification</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hi <strong>${name}</strong>,</p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Thank you for registering with DayFlow HRMS. Please use the following verification code to verify your email address:
        </p>
        
        <div style="background: white; padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px; border: 2px solid #667eea;">
          <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
            ${otp}
          </div>
        </div>
        
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          <strong>Important:</strong> This code will expire in <strong>10 minutes</strong>.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
          If you didn't create an account, please ignore this email.
        </p>
        
        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
          <p style="font-size: 12px; color: #999; margin: 0;">
            Best regards,<br>
            <strong>DayFlow HRMS Team</strong>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate plain text email
function getOTPEmailText(name: string, otp: string): string {
  return `
Email Verification - DayFlow HRMS

Hi ${name},

Thank you for registering with DayFlow HRMS. Please use the following verification code to verify your email address:

Verification Code: ${otp}

This code will expire in 10 minutes.

If you didn't create an account, please ignore this email.

Best regards,
DayFlow HRMS Team
  `.trim();
}

// Send OTP email using Resend
async function sendWithResend(
  to: string,
  otp: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = createResendClient();
    if (!resend) {
      return { success: false, error: "Resend client not initialized" };
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "DayFlow HRMS <onboarding@resend.dev>";

    console.log("📤 Sending email via Resend to:", to);
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: "Verify Your Email - DayFlow HRMS",
      html: getOTPEmailHTML(name, otp),
      text: getOTPEmailText(name, otp),
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Email sent successfully via Resend");
    console.log("   Email ID:", data?.id);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Resend exception:", error);
    return { success: false, error: error.message || "Failed to send email via Resend" };
  }
}

// Send OTP email using Nodemailer (SMTP/Gmail)
async function sendWithNodemailer(
  to: string,
  otp: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createNodemailerTransporter();
    if (!transporter) {
      return { success: false, error: "Nodemailer transporter not initialized" };
    }

    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@dayflow.com";
    const fromName = process.env.SMTP_FROM_NAME || "DayFlow HRMS";

    console.log("📤 Sending email via SMTP to:", to);

    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: to,
      subject: "Verify Your Email - DayFlow HRMS",
      html: getOTPEmailHTML(name, otp),
      text: getOTPEmailText(name, otp),
    });

    console.log("✅ Email sent successfully via SMTP");
    console.log("   Message ID:", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ SMTP error:", error);
    return { success: false, error: error.message || "Failed to send email via SMTP" };
  }
}

// Main function to send OTP email
export async function sendOTPEmail(
  to: string,
  otp: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  const provider = getEmailProvider();

  console.log("\n📧 Email Configuration:");
  console.log("   Provider:", provider);
  console.log("   Recipient:", to);

  switch (provider) {
    case "resend":
      console.log("   Using: Resend API");
      return sendWithResend(to, otp, name);

    case "smtp":
      console.log("   Using: Custom SMTP");
      return sendWithNodemailer(to, otp, name);

    case "gmail":
      console.log("   Using: Gmail SMTP");
      return sendWithNodemailer(to, otp, name);

    case "none":
    default:
      // Development mode - log OTP to console
      console.log("\n" + "=".repeat(60));
      console.log("⚠️  NO EMAIL SERVICE CONFIGURED - DEVELOPMENT MODE");
      console.log("=".repeat(60));
      console.log(`📧 Email would be sent to: ${to}`);
      console.log(`👤 User name: ${name}`);
      console.log("");
      console.log("🔐 VERIFICATION CODE: " + otp);
      console.log("");
      console.log("💡 To enable email sending, add one of these to .env:");
      console.log("");
      console.log("   Option 1 - Resend (Recommended, free 100 emails/day):");
      console.log("   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx");
      console.log("   RESEND_FROM_EMAIL=DayFlow HRMS <onboarding@resend.dev>");
      console.log("");
      console.log("   Option 2 - Gmail SMTP:");
      console.log("   SMTP_USER=your-gmail@gmail.com");
      console.log("   SMTP_PASSWORD=your-app-password");
      console.log("   SMTP_FROM=your-gmail@gmail.com");
      console.log("");
      console.log("   Option 3 - Custom SMTP:");
      console.log("   SMTP_HOST=smtp.example.com");
      console.log("   SMTP_PORT=587");
      console.log("   SMTP_USER=your-username");
      console.log("   SMTP_PASSWORD=your-password");
      console.log("   SMTP_FROM=noreply@example.com");
      console.log("=".repeat(60) + "\n");
      
      // Return success in development mode so registration can proceed
      return { success: true };
  }
}

// Test email configuration
export async function testEmailConfig(): Promise<{ success: boolean; error?: string; provider?: string }> {
  const provider = getEmailProvider();

  console.log("\n🧪 Testing Email Configuration...");
  console.log("   Detected provider:", provider);

  if (provider === "none") {
    return {
      success: false,
      error: "No email service configured. OTPs will be logged to console in development mode.",
      provider: "none",
    };
  }

  if (provider === "resend") {
    const resend = createResendClient();
    if (!resend) {
      return { success: false, error: "Failed to create Resend client", provider };
    }
    // Resend doesn't have a verify method, but if we got here, the API key is set
    console.log("✅ Resend API key is configured");
    return { success: true, provider };
  }

  // SMTP/Gmail verification
  try {
    const transporter = createNodemailerTransporter();
    if (!transporter) {
      return { success: false, error: "Failed to create SMTP transporter", provider };
    }
    await transporter.verify();
    console.log("✅ SMTP connection verified");
    return { success: true, provider };
  } catch (error: any) {
    console.error("❌ SMTP verification failed:", error.message);
    return { success: false, error: error.message, provider };
  }
}

