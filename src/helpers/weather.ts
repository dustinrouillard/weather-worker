import { WeatherToken } from "../config";
import { WeatherData } from "../types/Weather";

export async function getByZip(zip: string, country?: string) {
  const data: WeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country || 'us'}&appid=${WeatherToken}`).then(r => r.json());

  if (data.cod == 404) throw { code: 'invalid_zip_code', status: 400 };

  const weather = {
    zip,
    city: data.name,
    temperature: {
      current: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min
    },
    humidity: data.main.humidity,
    conditions: data.weather.map(weather => ({ code: weather.main, description: weather.description }))
  };

  return weather;
}

export async function getById(id: string) {
  const data: WeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${WeatherToken}`).then(r => r.json());

  if (data.cod == 404) throw { code: 'invalid_city_id', status: 400 };

  const weather = {
    id,
    city: data.name,
    temperature: {
      current: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min
    },
    humidity: data.main.humidity,
    conditions: data.weather.map(weather => ({ code: weather.main, description: weather.description }))
  };

  return weather;
}

export async function getByCoords(lat: string, lon: string) {
  const data: WeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherToken}`).then(r => r.json());

  if (data.cod == 404) throw { code: 'invalid_geocoords', status: 400 };

  const weather = {
    city: data.name,
    temperature: {
      current: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min
    },
    humidity: data.main.humidity,
    conditions: data.weather.map(weather => ({ code: weather.main, description: weather.description }))
  };

  return weather;
}