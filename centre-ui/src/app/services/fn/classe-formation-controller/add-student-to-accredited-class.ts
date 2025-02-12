/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';


export interface AddStudentToAccreditedClass$Params {
  studentId: number;
  accreditedClassId: number;
}

export function addStudentToAccreditedClass(http: HttpClient, rootUrl: string, params: AddStudentToAccreditedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, addStudentToAccreditedClass.PATH, 'post');
  if (params) {
    rb.path('studentId', params.studentId, {});
    rb.path('accreditedClassId', params.accreditedClassId, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({body: parseFloat(String((r as HttpResponse<any>).body))}) as StrictHttpResponse<number>;
    })
  );
}

addStudentToAccreditedClass.PATH = '/class/students/{studentId}/accredited-classes/{accreditedClassId}';
