import { getById, getByZip, getByCoords } from "../helpers/weather";
import { cacheData, getCacheByKey, WeatherCache } from "../kv";
import { RequestParams } from "../types/Request";

export async function GetWeatherByZip(request: Request, params: RequestParams<{ zip: string; country?: string }>) {
  const cached = await getCacheByKey(`weather/zip/${params.zip}:${params.country || 'us'}`);
  const data = cached ? cached : await getByZip(params.zip, params.country);
  if (!cached) await cacheData(`weather/zip/${params.zip}:${params.country || 'us'}`, data, 1800);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', ...(cached ? { 'dstn-cached': 'true' } : {}) },
  });
}

export async function GetWeatherByID(request: Request, params: RequestParams<{ id: string }>) {
  const cached = await getCacheByKey(`weather/id/${params.id}`);
  const data = cached ? cached : await getById(params.id);
  if (!cached) await cacheData(`weather/id/${params.id}`, data, 1800);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', ...(cached ? { 'dstn-cached': 'true' } : {}) },
  });
}

export async function GetWeatherByCoords(request: Request, params: RequestParams<{ lat: string; lon: string }>) {
  const cached = await getCacheByKey(`weather/coords/${params.lat}:${params.lon}`);
  const data = cached ? cached : await getByCoords(params.lat, params.lon);
  if (!cached) await cacheData(`weather/coords/${params.lat}:${params.lon}`, data, 1800);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', ...(cached ? { 'dstn-cached': 'true' } : {}) },
  });
}
