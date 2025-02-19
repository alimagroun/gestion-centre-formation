/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseTeacherResponse } from '../../models/page-response-teacher-response';

export interface FindAllTeachersPaged$Params {
  page?: number;
  size?: number;
}

export function findAllTeachersPaged(http: HttpClient, rootUrl: string, params?: FindAllTeachersPaged$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTeacherResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllTeachersPaged.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseTeacherResponse>;
    })
  );
}

findAllTeachersPaged.PATH = '/person/teacher';
