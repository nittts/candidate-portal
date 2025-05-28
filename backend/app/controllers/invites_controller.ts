import type { HttpContext } from '@adonisjs/core/http'

import { InvitesService } from '#services/invites_service'
import { FindnewInvitesCountValidator } from '#validators/invites/find_new_invites_count_validator'
import { SendInviteValidator } from '#validators/invites/send_invite.validator'
import { inject } from '@adonisjs/core'
import { UserType } from '#models/user/enums/user_type'
import { MarkAsSeenValidator } from '#validators/invites/mark_as_seen_validator'

@inject()
export default class InvitesController {
  constructor(private invitesService: InvitesService) {}

  async findNewInvitesCount(context: HttpContext) {
    const { auth, request, response } = context
    const requestUser = await auth.authenticate()
    const payload = await FindnewInvitesCountValidator.compile(request.params())

    if (requestUser.id !== payload.userId) {
      response.abort('Forbidden Access', 403)
    }

    return this.invitesService.findNewInvitesCount(payload)
  }

  async sendInvite(context: HttpContext) {
    const { auth, request, response } = context
    const requestUser = await auth.authenticate()
    const payload = await SendInviteValidator.compile(request.params())

    if (requestUser.userType !== UserType.ADMIN) {
      response.abort('User type not allowed', 401)
    }

    if (requestUser.id === payload.userId) {
      response.abort('Admins cannot invite themselves', 400)
    }

    return this.invitesService.sendInvite(payload, requestUser.id)
  }

  async markAsSeen(context: HttpContext) {
    const { auth, request } = context
    await auth.authenticate()
    const payload = await MarkAsSeenValidator.compile(request.body())

    return this.invitesService.markAsSeen(payload)
  }

  async findByUserId(context: HttpContext) {
    const { auth, request, response } = context
    const requestUser = await auth.authenticate()
    const payload = await FindnewInvitesCountValidator.compile(request.params())

    if (requestUser.id !== payload.userId) {
      response.abort('Forbidden Access', 403)
    }

    return this.invitesService.findInvites(payload)
  }
}
