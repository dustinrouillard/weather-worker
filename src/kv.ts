declare const WEATHER_CACHE: KVNamespace;

export const WeatherCache = WEATHER_CACHE;

export async function getCacheByKey(key: string) {
  const data = await WeatherCache.get(key);
  if (!data) return;
  else return JSON.parse(data);
}

export async function cacheData(key: string, data: any, ttl?: number) {
  const options = ttl ? { expirationTtl: ttl } : {};
  await WeatherCache.put(key, typeof data == 'object' ? JSON.stringify(data) : data.toString(), options);
  return ttl;
}