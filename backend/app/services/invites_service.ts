import Invite from '#models/invite/invite'
import { FindnewInvitesCountValidator } from '#validators/invites/find_new_invites_count_validator'
import { SendInviteValidator } from '#validators/invites/send_invite.validator'
import { DateTime } from 'luxon'

export class InvitesService {
  async findNewInvitesCount(params: typeof FindnewInvitesCountValidator.type) {
    const results = await Invite.query().where('candidateId', params.userId).where('seen', false)

    return { invites: results, count: results.length }
  }

  async sendInvite(params: typeof SendInviteValidator.type) {
    return await Invite.create({
      candidateId: params.userId,
      createdAt: DateTime.now(),
      seen: false,
      selectedDate: DateTime.now(),
      adminId: params.userId,
    })
  }
}
