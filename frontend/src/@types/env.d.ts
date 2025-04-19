interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
