import Invite from '#models/invite/invite'
import { FindnewInvitesCountValidator } from '#validators/invites/find_new_invites_count_validator'
import { MarkAsSeenValidator } from '#validators/invites/mark_as_seen_validator'
import { SendInviteValidator } from '#validators/invites/send_invite.validator'
import { DateTime } from 'luxon'

export class InvitesService {
  async findNewInvitesCount(params: typeof FindnewInvitesCountValidator.type) {
    const results = await Invite.query()
      .where('candidateId', params.userId)
      .where('seen', false)
      .preload('admin')
      .preload('candidate')
      .exec()

    return { invites: results, count: results.length }
  }

  async sendInvite(params: typeof SendInviteValidator.type, adminId: number) {
    return await Invite.create({
      candidateId: params.userId,
      seen: false,
      selectedDate: DateTime.now(),
      adminId: adminId,
    })
  }

  async markAsSeen(params: typeof MarkAsSeenValidator.type) {
    return await Invite.query().whereIn('id', params.inviteIds).update({ seen: true })
  }

  async findInvites(params: typeof FindnewInvitesCountValidator.type) {
    const results = await Invite.query()
      .where('candidateId', params.userId)
      .preload('admin')
      .preload('candidate')
      .exec()

    return { invites: results, count: results.length }
  }
}
