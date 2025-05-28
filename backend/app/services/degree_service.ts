import Degree from '#models/degree/degree'
import { CreateDegreeValidator } from '#validators/degree/create_degree_validator'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

@inject()
export class DegreeService {
  async createBulk(degrees: (typeof CreateDegreeValidator.type)[]) {
    await Degree.createMany(
      degrees.map(({ graduationDate, ...rest }) => ({
        ...rest,
        graduationDate: DateTime.fromJSDate(graduationDate),
      }))
    )
  }
}
