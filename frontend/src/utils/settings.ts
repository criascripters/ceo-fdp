const apiUrl = typeof import.meta.env.VITE_API_URL === 'string' ? import.meta.env.VITE_API_URL : 'http://localhost:8000'
const env = typeof import.meta.env.VITE_ENV === 'string' ? import.meta.env.VITE_ENV : 'development'
const discordId = typeof import.meta.env.VITE_DISCORD_ID === 'string' ? import.meta.env.VITE_DISCORD_ID : ''

export const settings = { apiUrl, env, discordId } as const
