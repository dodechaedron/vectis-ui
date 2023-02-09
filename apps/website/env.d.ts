declare namespace NodeJS {
    interface ProcessEnv {
      readonly NOTION_DATABASE_ID: string;
      readonly NOTION_API_KEY: string;
    }
}
