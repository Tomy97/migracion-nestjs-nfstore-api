declare namespace NodeJs {
  interface ProccessEnv {
    PORT: number;
    ENV: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: string;
  }
}
