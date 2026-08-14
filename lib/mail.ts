import nodemailer from 'nodemailer'

const CONTACT_RECIPIENTS = ['cyruskaviani@loslistos.com', 'davidtaylor@loslistos.com']

let transporter: nodemailer.Transporter | undefined

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    })
  }
  return transporter
}

export type ContactSubmission = {
  name: string
  email: string
  phone: string
  city: string
  service: string
  message: string
}

export async function sendContactEmail(submission: ContactSubmission) {
  const { name, email, phone, city, service, message } = submission

  await getTransporter().sendMail({
    from: `Los Listos Realty <${process.env.SMTP_USER}>`,
    to: CONTACT_RECIPIENTS,
    replyTo: email,
    subject: `New contact form submission from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City of Interest: ${city || 'Not specified'}`,
      `Service: ${service}`,
      '',
      'Message:',
      message || '(no message provided)',
    ].join('\n'),
  })
}
