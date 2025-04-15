import fetch from "node-fetch";

interface Geo {
  status: string;
  country: string;
  regionName: string;
  city: string;
  isp: string;
  org: string;
}

export async function getGeo(ip: string) {
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org`);
  const data = await response.json();
  return data as Geo;
}
