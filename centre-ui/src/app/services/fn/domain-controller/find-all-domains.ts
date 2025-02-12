/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PageResponseDomainResponse} from '../../models/page-response-domain-response';

export interface FindAllDomains$Params {
  page?: number;
  size?: number;
}

export function findAllDomains(http: HttpClient, rootUrl: string, params?: FindAllDomains$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDomainResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllDomains.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseDomainResponse>;
    })
  );
}

findAllDomains.PATH = '/domain';
