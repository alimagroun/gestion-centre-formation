/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PageResponseDomaineResponse} from '../../models/page-response-domaine-response';

export interface FindAllDomain$Params {
  page?: number;
  size?: number;
}

export function findAllDomain(http: HttpClient, rootUrl: string, params?: FindAllDomain$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDomaineResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllDomain.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseDomaineResponse>;
    })
  );
}

findAllDomain.PATH = '/domaine';
