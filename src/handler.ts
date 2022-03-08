import Route from 'route-parser';

import { Base } from './methods/base';
import { NotFound } from './methods/notfound';
import { GetWeatherByCoords, GetWeatherByID, GetWeatherByZip } from './methods/weather';
import { RouteDefinition } from './types/Routes';

const routes: RouteDefinition[] = [
  { route: new Route('/coords/:lat/:lon'), method: 'GET', handler: GetWeatherByCoords },
  { route: new Route('/city/:id'), method: 'GET', handler: GetWeatherByID },
  { route: new Route('/:zip/:country'), method: 'GET', handler: GetWeatherByZip },
  { route: new Route('/:zip'), method: 'GET', handler: GetWeatherByZip },
  { route: new Route('/'), method: 'GET', handler: Base }
];

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const route = routes.find((route) => route.route.match(url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname) && route.method == request.method);
  if (!route) return NotFound(request);

  const params = route.route.match(url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname);

  return route.handler(request, params, url, route.args);
}
