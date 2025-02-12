/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PageResponseSpecialtyResponse} from '../../models/page-response-specialty-response';

export interface FindAllSpecialtyPageable$Params {
  page?: number;
  size?: number;
}

export function findAllSpecialtyPageable(http: HttpClient, rootUrl: string, params?: FindAllSpecialtyPageable$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSpecialtyResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllSpecialtyPageable.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseSpecialtyResponse>;
    })
  );
}

findAllSpecialtyPageable.PATH = '/specialty';
