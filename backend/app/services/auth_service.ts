import User from '#models/user/user'
import { LoginValidator } from '#validators/auth/login_validator'

export class AuthService {
  async login(params: typeof LoginValidator.type) {
    const user = await User.verifyCredentials(params.email, params.password)

    if (!user.active) {
      throw new Error('User not active')
    }

    const token = await User.accessTokens.create(user, ['*'], { name: 'login-jwt' })

    return {
      type: 'bearer',
      token: token.value!.release(),
    }
  }
}
