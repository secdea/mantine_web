// global.d.ts
interface RuntimeConfig {
  API_BASE_URL: string;
}

interface Window {
  runtimeConfig?: RuntimeConfig;
}
