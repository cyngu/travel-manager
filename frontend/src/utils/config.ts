import type { AppConfig } from '@/types/global'

export function getConfig(): AppConfig {
  const isProduction = import.meta.env.MODE === 'production'
  const configSource = isProduction ? window.config || {} : import.meta.env

  return {
    VITE_API_ENDPOINT: configSource.VITE_API_ENDPOINT,
  }
}
