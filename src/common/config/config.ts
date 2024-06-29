import type { Env } from "./../types/Env";

class Config {
  getEnv(): Env {
    return {
      API_KEY: import.meta.env.VITE_API_KEY,
      AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
      STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
      MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGING_SENDER_ID,
      APP_ID: import.meta.env.VITE_APP_ID,
      PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
    };
  }
}

export default new Config();
