import instance from "./_base";

export async function findNewInvitesCount(payload: { id: number }) {
  const { data } = await instance.get(`invites/${payload.id}/new`);

  return data;
}

export async function listAllInvitesByUserId(payload: { id: number }) {
  const { data } = await instance.get(`invites/${payload.id}`);

  return data;
}

export async function markInviteAsSeen(payload: { inviteIds: number[] }) {
  const { data } = await instance.post("invites/seen", payload);

  return data;
}

export async function sendInvite(payload: { userId: number }) {
  const { data } = await instance.post(`invites/${payload.userId}`);

  return data;
}
