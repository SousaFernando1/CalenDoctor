import { jwtDecode } from 'jwt-decode';

export function verifyExpireToken(token: string) {
  const tokenDecoded: any = jwtDecode(token);
  const now = new Date().getTime() / 1000;

  return tokenDecoded?.exp <= now;
}
