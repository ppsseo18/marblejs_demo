import { throwError, of, iif } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Effect, HttpError, HttpStatus } from '@marblejs/core';
import * as FileHelper from '@marblejs/core/dist/+internal/files';
import { ContentType } from '@marblejs/core/dist/+internal/http';
import { STATIC_PATH } from '../../config/constant';

const NOT_FOUND_PAGE = 'not_found.html';
const headers = { 'Content-Type': ContentType.TEXT_HTML };

const getNotFound = of(NOT_FOUND_PAGE).pipe(
  mergeMap(FileHelper.readFile(STATIC_PATH)),
  map(body => ({ 
    status: 404, 
    headers, 
    body 
  })),
)

export const getStaticFileEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req => of(req.params.dir as string).pipe(
      mergeMap(FileHelper.readFile(STATIC_PATH)),
      map(body => ({ body })),
      catchError(error => iif(
        () => error.code === 'ENOENT',
        getNotFound,
        throwError(new HttpError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)),
      )),
    )),
  );
  