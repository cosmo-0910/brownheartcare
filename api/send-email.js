import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, to, donorName, amount, currency, subject, message, bcc, from } = req.body;

  try {
    let emailSubject = subject || 'Thank you from Brown Heart Care Foundation';
    let htmlContent = message || '<p>Thank you for your support!</p>';

    // Use a verified domain or resend default testing email if not provided
    const sender = from || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (type === 'donation_thank_you') {
      emailSubject = 'Thank You for Your Generous Donation!';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #b0004a;">Thank You, ${donorName}!</h2>
          <p>We have successfully received your donation of <strong>${currency === 'NGN' ? '₦' : '$'}${amount}</strong>.</p>
          <p>Your contribution directly supports essential food distribution, emergency relief, and community welfare programs for those who need it most.</p>
          <p>An official tax-deductible receipt will follow shortly.</p>
          <p>With gratitude,<br>The Brown Heart Care Team</p>
        </div>
      `;
    } else if (type === 'volunteer_signup') {
      emailSubject = 'New Volunteer Registration Received';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #b0004a;">New Volunteer: ${donorName}</h2>
          <p>A new volunteer has just signed up!</p>
          <p><strong>Email:</strong> ${to}</p>
          <p>Please log in to the Admin Dashboard to review their full profile and qualifications.</p>
        </div>
      `;
    } else if (type === 'mass_email') {
      // Sent from admin dashboard
      emailSubject = subject;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${message}
        </div>
      `;
    }

    const emailOptions = {
      from: sender,
      to: type === 'volunteer_signup' ? (process.env.ADMIN_EMAIL || 'brownheartcare@gmail.com') : to,
      subject: emailSubject,
      html: htmlContent,
    };

    if (bcc) {
      emailOptions.bcc = bcc;
    }

    const data = await resend.emails.send(emailOptions);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
