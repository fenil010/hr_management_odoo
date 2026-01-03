import nodemailer from "nodemailer";

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean; // true for 465, false for other ports
  auth: {
    user: string;
    pass: string;
  };
  from: string; // Sender email address
  fromName?: string; // Sender name
}

// Create email transporter based on configuration
function createTransporter() {
  // Option 1: Use environment variables for SMTP configuration
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_SECURE = process.env.SMTP_SECURE === "true";
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
  const SMTP_FROM = process.env.SMTP_FROM;
  const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || "DayFlow HRMS";

  console.log("\n📧 Email Configuration Check:");
  console.log("   SMTP_HOST:", SMTP_HOST || "❌ Not set");
  console.log("   SMTP_PORT:", SMTP_PORT || "❌ Not set");
  console.log("   SMTP_USER:", SMTP_USER || "❌ Not set");
  console.log("   SMTP_PASSWORD:", SMTP_PASSWORD ? "✅ Set" : "❌ Not set");
  console.log("   SMTP_FROM:", SMTP_FROM || "❌ Not set");

  // If all SMTP config is provided, use it
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASSWORD && SMTP_FROM) {
    console.log("   ✅ Using custom SMTP configuration");
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

  // Option 2: Use Gmail (if only user/password provided)
  if (SMTP_USER && SMTP_PASSWORD && !SMTP_HOST) {
    console.log("   ✅ Using Gmail SMTP");
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  console.log("   ⚠️ No email service configured - OTP will be in console\n");
  return null;
}

// Send OTP email
export async function sendOTPEmail(
  to: string,
  otp: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.log("⚠️ Email service not configured. OTP for", to, ":", otp);
      console.log("⚠️ ⚠️ ⚠️ USE THIS OTP TO VERIFY:", otp, "⚠️ ⚠️ ⚠️");
      return { success: true }; // Allow registration even without email
    }

    const SMTP_FROM = process.env.SMTP_FROM || process.env.SMTP_USER;
    const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || "DayFlow HRMS";

    const fromEmail = SMTP_FROM || process.env.SMTP_USER || "noreply@dayflow.com";
    const fromName = SMTP_FROM_NAME || "DayFlow HRMS";

    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: to,
      subject: "Verify Your Email - DayFlow HRMS",
      html: `
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
      `,
      text: `
        Email Verification - DayFlow HRMS
        
        Hi ${name},
        
        Thank you for registering with DayFlow HRMS. Please use the following verification code to verify your email address:
        
        Verification Code: ${otp}
        
        This code will expire in 10 minutes.
        
        If you didn't create an account, please ignore this email.
        
        Best regards,
        DayFlow HRMS Team
      `,
    };

    console.log("📤 Attempting to send email to:", to);
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", to);
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);
    return { success: true };
  } catch (error: any) {
    console.error("\n❌ ERROR SENDING EMAIL:");
    console.error("   To:", to);
    console.error("   Error Code:", error.code);
    console.error("   Error Message:", error.message);
    if (error.response) {
      console.error("   SMTP Response:", error.response);
    }
    if (error.responseCode) {
      console.error("   Response Code:", error.responseCode);
    }
    console.error("");
    return {
      success: false,
      error: error.message || "Failed to send email",
    };
  }
}

// Test email configuration
export async function testEmailConfig(): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      return {
        success: false,
        error: "Email service not configured. Please set SMTP environment variables.",
      };
    }

    // Verify connection
    await transporter.verify();
    console.log("✅ Email server connection verified");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Email configuration test failed:", error);
    return {
      success: false,
      error: error.message || "Failed to connect to email server",
    };
  }
}

