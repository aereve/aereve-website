const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many email requests from this IP, please try again later.'
});

app.use('/send-email', limiter);

// Email configuration
const transporter = nodemailer.createTransporter({
    // For Gmail (you'll need to configure app passwords)
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
    
    // Alternative: For SMTP servers
    /*
    host: process.env.SMTP_HOST || 'smtp.your-provider.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    */
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { firstName, lastName, email, company, phone, inquiry, message } = req.body;
        
        // Validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: firstName, lastName, email, message'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Prepare email content
        const emailContent = `
New contact form submission from Aereve website:

Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Inquiry Type: ${inquiry || 'General Inquiry'}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
IP Address: ${req.ip}
User Agent: ${req.get('User-Agent')}
        `;
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@aereve.com',
            to: 'info@aereve.com',
            subject: `New Contact Form Submission - ${inquiry || 'General Inquiry'}`,
            text: emailContent,
            replyTo: email
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        // Log successful submission
        console.log(`Email sent successfully from ${email} to info@aereve.com`);
        
        res.json({
            success: true,
            message: 'Thank you for your message! We will get back to you within 24 hours.'
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again or contact us directly at info@aereve.com'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Email service running on port ${PORT}`);
    console.log('Make sure to set EMAIL_USER and EMAIL_PASS environment variables');
});

module.exports = app;
