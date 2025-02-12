/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PageResponseSchoolYearResponse} from '../../models/page-response-school-year-response';

export interface FindAll1$Params {
  page?: number;
  size?: number;
}

export function findAll1(http: HttpClient, rootUrl: string, params?: FindAll1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSchoolYearResponse>> {
  const rb = new RequestBuilder(rootUrl, findAll1.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseSchoolYearResponse>;
    })
  );
}

findAll1.PATH = '/school-years';
