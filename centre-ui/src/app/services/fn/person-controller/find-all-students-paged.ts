/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseStudentResponse } from '../../models/page-response-student-response';

export interface FindAllStudentsPaged$Params {
  page?: number;
  size?: number;
}

export function findAllStudentsPaged(http: HttpClient, rootUrl: string, params?: FindAllStudentsPaged$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStudentResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllStudentsPaged.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseStudentResponse>;
    })
  );
}

findAllStudentsPaged.PATH = '/person/person/student';
