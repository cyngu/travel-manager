export interface AppConfig {
  VITE_API_ENDPOINT: string
}

declare global {
  interface Window {
    config?: Partial<AppConfig>
  }
}

export {}
