/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PageResponseRegistrationResponse} from '../../models/page-response-registration-response';

export interface FindAllRegistrations$Params {
  page?: number;
  size?: number;
}

export function findAllRegistrations(http: HttpClient, rootUrl: string, params?: FindAllRegistrations$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRegistrationResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllRegistrations.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseRegistrationResponse>;
    })
  );
}

findAllRegistrations.PATH = '/register';
