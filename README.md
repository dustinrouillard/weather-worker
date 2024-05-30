# Weather API

This worker basically just proxies [OpenWeatherMap](https://openweathermap.org/), however it adds caching and makes querying it more straightforward for various uses.

## Examples

### Get by zip code

```json
GET /90210

{
  "zip": "90210",
  "city": "Beverly Hills",
  "temperature": {
    "current": 287.07,
    "max": 289.6,
    "min": 285.43
  },
  "humidity": 88,
  "conditions": [
    {
      "code": "Clouds",
      "description": "scattered clouds"
    }
  ]
}
```

### Get by latitude and longitude

```json
GET /coords/37.8283/-96.5795

{
  "city": "Butler",
  "temperature": {
    "current": 291.64,
    "max": 291.73,
    "min": 291.44
  },
  "humidity": 87,
  "conditions": [
    {
      "code": "Clouds",
      "description": "overcast clouds"
    }
  ]
}
```