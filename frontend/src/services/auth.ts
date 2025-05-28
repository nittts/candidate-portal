import { LoginParams } from "@/@types/auth";
import instance from "./_base";

export async function login(payload: LoginParams) {
  const { data } = await instance.post("auth/token", payload);

  return data;
}
