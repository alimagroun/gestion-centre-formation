/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseClassSubjectResponse } from '../../models/page-response-class-subject-response';

export interface GetAllClassSubjects$Params {
  page?: number;
  size?: number;
}

export function getAllClassSubjects(http: HttpClient, rootUrl: string, params?: GetAllClassSubjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClassSubjectResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllClassSubjects.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseClassSubjectResponse>;
    })
  );
}

getAllClassSubjects.PATH = '/api/class-subjects';
