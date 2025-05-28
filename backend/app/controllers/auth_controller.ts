import { AuthService } from '#services/auth_service'
import { LoginValidator } from '#validators/auth/login_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async login(context: HttpContext) {
    const params = await LoginValidator.compile(context.request.body())

    return await this.authService.login(params)
  }
}
