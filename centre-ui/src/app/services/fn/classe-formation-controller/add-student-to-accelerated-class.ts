/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddStudentToAcceleratedClass$Params {
  studentId: number;
  acceleratedClassId: number;
}

export function addStudentToAcceleratedClass(http: HttpClient, rootUrl: string, params: AddStudentToAcceleratedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, addStudentToAcceleratedClass.PATH, 'post');
  if (params) {
    rb.path('studentId', params.studentId, {});
    rb.path('acceleratedClassId', params.acceleratedClassId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

addStudentToAcceleratedClass.PATH = '/class/students/{studentId}/accelerated-classes/{acceleratedClassId}';
