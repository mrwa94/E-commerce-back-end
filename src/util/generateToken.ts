import jwt from 'jsonwebtoken'

const generateToken = (payload: any) => {
  const secretKey = process.env.JWT_USER_ACTIVATION_KEY

  if (!secretKey) {
    throw new Error('JWT secret key is not defined')
  }

  return jwt.sign(payload, secretKey, {
    expiresIn: '5m',
  })
}

export default generateToken
