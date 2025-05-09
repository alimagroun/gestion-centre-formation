/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeacherResponse } from '../../models/teacher-response';

export interface GetTeacherInfo$Params {
}

export function getTeacherInfo(http: HttpClient, rootUrl: string, params?: GetTeacherInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<TeacherResponse>> {
  const rb = new RequestBuilder(rootUrl, getTeacherInfo.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeacherResponse>;
    })
  );
}

getTeacherInfo.PATH = '/person/teacher/info';
