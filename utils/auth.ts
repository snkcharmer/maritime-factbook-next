import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export function isTokenExpired(token: string): boolean {
  const decoded: DecodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export function setTokenInCookies(token: string) {
  document.cookie = `auth-token=${token}; path=/; secure; samesite=strict`;
}

export function getTokenFromCookies(): string | null {
  const tokenMatch = document.cookie.match(
    '(^|;)\\s*auth-token\\s*=\\s*([^;]+)'
  );
  return tokenMatch ? tokenMatch.pop() || null : null;
}

export function removeTokenFromCookies() {
  document.cookie = `auth-token=; Max-Age=0; path=/; secure; samesite=strict`;
}
