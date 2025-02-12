/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PageResponseSubjectResponse} from '../../models/page-response-subject-response';

export interface GetAllSubjects$Params {
  page?: number;
  size?: number;
}

export function getAllSubjects(http: HttpClient, rootUrl: string, params?: GetAllSubjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSubjectResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllSubjects.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseSubjectResponse>;
    })
  );
}

getAllSubjects.PATH = '/subject';
