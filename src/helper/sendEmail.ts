import nodemailer from 'nodemailer'

import { EmailDataType } from '../types'
import { dev } from '../config/server'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: dev.app.smtpUserName,
    pass: dev.app.smtpUserPassword,
  },
})

export const handleSendEmail = async (emailData: EmailDataType) => {
  try {
    const mailOption = {
      from: dev.app.smtpUserName,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    }
    const info = await transporter.sendMail(mailOption)
    console.log('Message send: ' + info.response)
  } catch (error) {
    console.error('Error encounterd while sending the email', error)
    throw error
  }
}
