/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {StudentDetailsResponse} from '../../models/student-details-response';

export interface FindStudentById$Params {
  studentId: number;
}

export function findStudentById(http: HttpClient, rootUrl: string, params: FindStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentDetailsResponse>> {
  const rb = new RequestBuilder(rootUrl, findStudentById.PATH, 'get');
  if (params) {
    rb.path('studentId', params.studentId, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentDetailsResponse>;
    })
  );
}

findStudentById.PATH = '/person/student/{studentId}';
