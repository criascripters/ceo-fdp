interface Geo {
  status: string
  country: string
  regionName: string
  city: string
  isp: string
  org: string
}

/**
 * Gets information about the user's location based on their IP address.
 *
 * @param ip - The IP address of the user.
 * @returns An object containing information about the user's location.
 */
export async function getGeo(ip: string) {
  // Workaround to use node-fetch as it's still CJS
  const { default: fetch } = await import('node-fetch')

  // Fetch the geo data from ip-api
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org`)
  const data = await response.json()

  return data as Geo
}
