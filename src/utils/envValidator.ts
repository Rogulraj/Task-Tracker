import { cleanEnv, port, str } from "envalid";

interface ValidateEnvType {
  VITE_API_BASE_URL: string;
  VITE_API_PORT: number;
}

export function ValidateEnv(): ValidateEnvType {
  return cleanEnv(import.meta.env, {
    VITE_API_BASE_URL: str(),
    VITE_API_PORT: port(),
  });
}
