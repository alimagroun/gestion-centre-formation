/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentAcceleratedClassResponse } from '../../models/student-accelerated-class-response';

export interface FindAllStudentAcceleratedClass$Params {
  classId: number;
}

export function findAllStudentAcceleratedClass(http: HttpClient, rootUrl: string, params: FindAllStudentAcceleratedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentAcceleratedClassResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllStudentAcceleratedClass.PATH, 'get');
  if (params) {
    rb.path('classId', params.classId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentAcceleratedClassResponse>>;
    })
  );
}

findAllStudentAcceleratedClass.PATH = '/class/accelerated/{classId}/students';
