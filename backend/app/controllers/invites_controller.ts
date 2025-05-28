import type { HttpContext } from '@adonisjs/core/http'

import { InvitesService } from '#services/invites_service'
import { FindnewInvitesCountValidator } from '#validators/invites/find_new_invites_count_validator'
import { SendInviteValidator } from '#validators/invites/send_invite.validator'
import { inject } from '@adonisjs/core'

@inject()
export default class InvitesController {
  constructor(private invitesService: InvitesService) {}

  async findByUserId(context: HttpContext) {
    const payload = await FindnewInvitesCountValidator.compile(context.request.params)

    return this.invitesService.findNewInvitesCount(payload)
  }

  async sendInvite(context: HttpContext) {
    const payload = await SendInviteValidator.compile(context.request.params)

    return this.invitesService.sendInvite(payload)
  }
}
