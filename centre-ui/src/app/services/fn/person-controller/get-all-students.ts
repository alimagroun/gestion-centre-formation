/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {StudentAllResponse} from '../../models/student-all-response';

export interface GetAllStudents$Params {
}

export function getAllStudents(http: HttpClient, rootUrl: string, params?: GetAllStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentAllResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllStudents.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentAllResponse>>;
    })
  );
}

getAllStudents.PATH = '/person/student/all';
