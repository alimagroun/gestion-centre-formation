/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentDetailsResponse } from '../../models/student-details-response';

export interface GetStudentInfo$Params {
}

export function getStudentInfo(http: HttpClient, rootUrl: string, params?: GetStudentInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentDetailsResponse>> {
  const rb = new RequestBuilder(rootUrl, getStudentInfo.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentDetailsResponse>;
    })
  );
}

getStudentInfo.PATH = '/person/student/info';
