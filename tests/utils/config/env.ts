import { config } from "dotenv";
config();

const getEnvs = () => {
  const { HTTP_URL, WS_URL } = process.env;

  if (!HTTP_URL || !WS_URL) throw Error("Did you forget to set .env?");

  return {
    HTTP_URL,
    WS_URL,
  };
};

export const env = getEnvs();
