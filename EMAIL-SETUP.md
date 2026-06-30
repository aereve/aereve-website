# Email Functionality Setup Guide

## Overview
The Aereve website now includes comprehensive email functionality that sends contact form submissions and newsletter subscriptions directly to **info@aereve.com**.

## Email Implementation Methods

### Method 1: PHP Backend (Recommended for shared hosting)
The website includes `send-email.php` which uses PHP's built-in `mail()` function.

**Setup:**
1. Upload all files to a web server with PHP support
2. Ensure the server can send emails (most shared hosting providers support this)
3. Test the contact form - emails will be sent to info@aereve.com

**Requirements:**
- Web server with PHP 7.4+ 
- Mail function enabled (standard on most hosting providers)

### Method 2: Node.js Email Service (For VPS/dedicated servers)
A more robust solution using Node.js with Nodemailer.

**Setup:**
1. Install Node.js on your server
2. Navigate to the website directory
3. Run: `npm run install-deps`
4. Configure email credentials (see configuration section below)
5. Start the service: `npm start`

**Requirements:**
- Node.js 16+
- SMTP credentials or Gmail app password

### Method 3: Mailto Fallback (Always available)
If backend services fail, the system automatically falls back to opening the user's email client with a pre-filled message.

## Email Configuration

### For Gmail (Node.js service):
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password: https://myaccount.google.com/apppasswords
3. Set environment variables:
   ```bash
   export EMAIL_USER="your-email@gmail.com"
   export EMAIL_PASS="your-app-password"
   ```

### For Other SMTP Providers:
Edit `email-service.js` and update the transporter configuration:
```javascript
const transporter = nodemailer.createTransporter({
    host: 'smtp.your-provider.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@domain.com',
        pass: 'your-password'
    }
});
```

## Features Included

### Contact Form (contact.html)
- ✅ Full form validation
- ✅ Email format validation
- ✅ Required field checking
- ✅ Loading states with spinner
- ✅ Success/error notifications
- ✅ Automatic fallback to mailto

### Newsletter Signup (resources.html)
- ✅ Email validation
- ✅ Subscription confirmation
- ✅ Integration with contact system
- ✅ Fallback to mailto

### Demo Request Buttons (all pages)
- ✅ Modal with contact information
- ✅ Direct links to contact form
- ✅ Phone and email display

## Email Content

### Contact Form Emails Include:
- Full name and contact details
- Company and phone (if provided)
- Inquiry type selection
- Complete message
- Timestamp and IP address
- User agent information

### Newsletter Subscriptions Include:
- Email address
- Subscription source (which page)
- Timestamp

## Testing

### Test Contact Form:
1. Go to contact.html
2. Fill out the form completely
3. Submit and check for success notification
4. Verify email arrives at info@aereve.com

### Test Newsletter:
1. Go to resources.html
2. Enter email in newsletter signup
3. Submit and check for confirmation
4. Verify subscription email arrives

## Troubleshooting

### Common Issues:

**PHP mail() not working:**
- Check if mail function is enabled: `php -m | grep mail`
- Contact hosting provider to enable mail function
- Check server mail logs

**Node.js service not sending:**
- Verify email credentials are correct
- Check firewall settings (port 587/465)
- Review console logs for error messages

**Emails going to spam:**
- Add SPF/DKIM records to your domain
- Use a dedicated SMTP service (SendGrid, Mailgun)
- Ensure "From" address matches your domain

### Fallback Behavior:
If all backend methods fail, the system will:
1. Open user's default email client
2. Pre-fill recipient (info@aereve.com)
3. Pre-fill subject and message
4. Show notification to user

## Security Features

- ✅ Rate limiting (5 emails per 15 minutes per IP)
- ✅ Input sanitization and validation
- ✅ CORS protection
- ✅ Email format validation
- ✅ Required field enforcement

## Deployment Checklist

- [ ] Upload all website files
- [ ] Test PHP mail function OR setup Node.js service
- [ ] Configure email credentials
- [ ] Test contact form submission
- [ ] Test newsletter signup
- [ ] Verify emails arrive at info@aereve.com
- [ ] Test fallback mailto functionality

## Support

For technical support with email setup:
- Check server logs for error messages
- Test with a simple PHP mail script first
- Contact your hosting provider for mail configuration help
- Consider using a dedicated email service for high volume

---

**Note:** The system is designed to be resilient - if one method fails, it automatically tries the next method, ensuring users can always contact Aereve.
