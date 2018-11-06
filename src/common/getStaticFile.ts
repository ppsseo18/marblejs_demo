import { EffectFactory } from '@marblejs/core';
import { getStaticFileEffect$ } from './effect/getStaticFile.effect';

export const getStaticFile$ = EffectFactory
  .matchPath('/:dir*')
  .matchType('GET')
  .use(getStaticFileEffect$);
