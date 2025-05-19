/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentClassResponse } from '../../models/student-class-response';

export interface GetStudentClass$Params {
}

export function getStudentClass(http: HttpClient, rootUrl: string, params?: GetStudentClass$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentClassResponse>> {
  const rb = new RequestBuilder(rootUrl, getStudentClass.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentClassResponse>;
    })
  );
}

getStudentClass.PATH = '/person/student/class';
