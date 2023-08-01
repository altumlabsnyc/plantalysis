import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const emailUser = process.env.EMAIL_USERNAME
const emailPass = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
})

export async function sendMail(body: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Team @ Altum 👻" <foo@example.com>', // sender address
    to: 'grant.rinehimer@altumlabs.co', // list of receivers
    subject: 'Demo Scheduled', // Subject line
    text: body, // plain text body
    html: '<b>Test</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}