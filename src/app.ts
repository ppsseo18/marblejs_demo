import { httpListener, RouteEffect } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { loggerWithOpts$ } from '@marblejs/middleware-logger';
import { getStaticFile$ } from './common/getStaticFile';

const middlewares = [
  loggerWithOpts$(),
  bodyParser$,
];

const effects = [
  getStaticFile$
];

export const app = httpListener({ middlewares, effects });