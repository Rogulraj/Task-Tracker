import { VITE_SESSION_TOKEN_NAME } from "@config/index";
import { TokenData } from "@interfaces/index";
import Cookies from "js-cookie";

export function GetSessionToken(): string | undefined {
  const token: string | undefined = Cookies.get(VITE_SESSION_TOKEN_NAME);

  return token;
}

export function SetSessionToken(tokenData: TokenData) {
  const token = tokenData?.token;
  const expiresIn = new Date();
  expiresIn.setTime(expiresIn.getTime() + tokenData.expiresIn * 1000);

  Cookies.set(VITE_SESSION_TOKEN_NAME, token, {
    expires: expiresIn,
  });
}
