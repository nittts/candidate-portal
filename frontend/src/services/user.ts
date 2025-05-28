import { ActivateUserParams, ListCandidatesParams, User } from "@/@types/user";
import instance from "./_base";
import axios from "axios";

export async function listCandidates(params: ListCandidatesParams) {
  const { data } = await instance.get("user", { params });

  return data;
}

export async function createCandidate(payload: Partial<User>) {
  const { data } = await instance.post("user", payload);

  return data;
}

export async function activateUser(payload: ActivateUserParams) {
  const { id, ...fields } = payload;

  const { data } = await instance.post(`user/${payload.id}/activate`, fields);

  return data;
}

export async function findUserById(payload: { id: number }) {
  const { data } = await instance.get(`user/${payload.id}`);

  return data;
}

export async function consultCEPAddress(payload: { cep: string }) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${payload.cep}/json`);

  return `${data.localidade}, ${data.estado}, ${data.regiao}`;
}
