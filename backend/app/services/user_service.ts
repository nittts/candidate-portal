import { CreateUserValidator } from '#validators/user/create_user_validator'

export class UserService {
  create(user: typeof CreateUserValidator.type) {}
}
