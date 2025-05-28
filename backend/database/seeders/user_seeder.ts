import { UserType } from '#models/user/enums/user_type'
import User from '#models/user/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'admin@talentbank.com',
        password: 'admin123',
        active: true,
        address: 'Endereço Ficticio, Cidade X, Oeste',
        birthdate: DateTime.now(),
        cep: '00000000',
        fullName: 'Demomstr. Admin',
        phone: '+551112345678',
        userType: UserType.ADMIN,
      },
      {
        email: 'candidate@example.com',
        password: 'candidate123',
        active: true,
        address: 'Endereço Ficticio, Cidade Y, Norte',
        birthdate: DateTime.now(),
        cep: '11111111',
        fullName: 'Demomstr. Candidato',
        phone: '+551187654321',
        userType: UserType.CANDIDATE,
      },
    ])
  }
}
