import 'dotenv/config'

export const dev = {
  app: {
    port: Number(process.env.SERVER_PORT) || 3002,
    jwtUserActivationkey: process.env.JWT_USER_ACTIVATION_KEY || 'shhhhh',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'shhhhh',
    smtpUserName: process.env.SMTP_USERNAME || 'ahmed@gmail.com',
    smtpUserPassword: process.env.SMTP_PASSWORD || '123123',
    jwtResetPasswordKey: process.env.JWT_RESET_PASSWORD_KEY || 'shhhhh',
  },
  db: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/e-commerce-db',
  },
}
