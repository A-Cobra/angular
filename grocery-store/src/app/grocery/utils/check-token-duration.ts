import { parseJwt } from './parse-jwt';

export function checkTokenDuration(token: string): boolean {
  const decoded: any = parseJwt(token);
  try {
    const difference: number =
      new Date().getTime() - new Date(decoded.exp).getTime();
    if (difference) {
      return true;
    }
    return false;
  } catch {}
  return false;
}
