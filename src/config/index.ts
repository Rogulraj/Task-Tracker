import { ValidateEnv } from "@utils/envValidator";

export const { VITE_API_BASE_URL, VITE_API_PORT, VITE_SESSION_TOKEN_NAME } =
  ValidateEnv();
