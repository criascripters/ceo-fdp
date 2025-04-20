import { settings } from '@/utils/settings'

const clientId = settings.discordId
const redirectUri = encodeURIComponent(window.location.origin)
const scope = encodeURIComponent('identify email')

export const discordRedirectUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
