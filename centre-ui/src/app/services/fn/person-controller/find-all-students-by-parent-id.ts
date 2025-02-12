/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {StudentResponse} from '../../models/student-response';

export interface FindAllStudentsByParentId$Params {
  parentId: number;
}

export function findAllStudentsByParentId(http: HttpClient, rootUrl: string, params: FindAllStudentsByParentId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllStudentsByParentId.PATH, 'get');
  if (params) {
    rb.path('parentId', params.parentId, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentResponse>>;
    })
  );
}

findAllStudentsByParentId.PATH = '/person/parent/{parentId}/students';
