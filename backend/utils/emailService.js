const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, use services like SendGrid, AWS SES, etc.
  
  if (process.env.NODE_ENV === 'development') {
    // Gmail configuration (for development only)
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      }
    });
  } else {
    // Production SMTP configuration
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, username, resetURL) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Victorian Elegance Furniture',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: email,
      subject: 'Password Reset Request - Victorian Elegance',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #FAF4E7;
            }
            .container {
              background-color: white;
              border-radius: 15px;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #93353E;
              padding-bottom: 20px;
            }
            .logo {
              color: #93353E;
              font-size: 2rem;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .title {
              color: #93353E;
              font-size: 1.5rem;
              margin-bottom: 20px;
            }
            .content {
              margin-bottom: 30px;
            }
            .reset-button {
              display: inline-block;
              background-color: #93353E;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 50px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin: 20px 0;
            }
            .reset-button:hover {
              background-color: #7A2B33;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 0.9rem;
              color: #666;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Victorian Elegance</div>
              <div class="title">Password Reset Request</div>
            </div>
            
            <div class="content">
              <p>Hello ${username},</p>
              
              <p>We received a request to reset your password for your Victorian Elegance account. If you made this request, please click the button below to reset your password:</p>
              
              <div style="text-align: center;">
                <a href="${resetURL}" class="reset-button">Reset My Password</a>
              </div>
              
              <div class="warning">
                <strong>Important:</strong> This link will expire in 10 minutes for security reasons. If you don't reset your password within this time, you'll need to request a new reset link.
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #93353E;">${resetURL}</p>
              
              <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            </div>
            
            <div class="footer">
              <p><strong>Victorian Elegance Furniture</strong><br>
              123 Heritage Lane, Antiqueshire<br>
              London, SW1A 1AA, United Kingdom<br>
              Phone: +44 20 7123 4567<br>
              Email: info@victorianelegance.com</p>
              
              <p style="margin-top: 20px; font-size: 0.8rem;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${username},

        We received a request to reset your password for your Victorian Elegance account.

        Please click the following link to reset your password:
        ${resetURL}

        This link will expire in 10 minutes for security reasons.

        If you didn't request a password reset, please ignore this email.

        Best regards,
        Victorian Elegance Team
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', result.messageId);
    return result;

  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Send welcome email (optional)
const sendWelcomeEmail = async (email, username) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Victorian Elegance Furniture',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: email,
      subject: 'Welcome to Victorian Elegance!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Victorian Elegance</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #FAF4E7;
            }
            .container {
              background-color: white;
              border-radius: 15px;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #93353E;
              padding-bottom: 20px;
            }
            .logo {
              color: #93353E;
              font-size: 2rem;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .title {
              color: #93353E;
              font-size: 1.5rem;
              margin-bottom: 20px;
            }
            .shop-button {
              display: inline-block;
              background-color: #93353E;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 50px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Victorian Elegance</div>
              <div class="title">Welcome to Our Family!</div>
            </div>
            
            <div class="content">
              <p>Dear ${username},</p>
              
              <p>Welcome to Victorian Elegance! We're delighted to have you join our community of furniture enthusiasts who appreciate the timeless beauty and craftsmanship of the Victorian era.</p>
              
              <p>As a member, you'll enjoy:</p>
              <ul>
                <li>Exclusive access to our curated collection</li>
                <li>Early notifications about new arrivals</li>
                <li>Special member discounts and offers</li>
                <li>Expert advice on Victorian furniture care</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/products" class="shop-button">Start Shopping</a>
              </div>
              
              <p>If you have any questions, our team is here to help. Feel free to contact us at info@victorianelegance.com or call us at +44 20 7123 4567.</p>
              
              <p>Thank you for choosing Victorian Elegance!</p>
              
              <p>Best regards,<br>The Victorian Elegance Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', result.messageId);
    return result;

  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error for welcome email as it's not critical
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendWelcomeEmail
};