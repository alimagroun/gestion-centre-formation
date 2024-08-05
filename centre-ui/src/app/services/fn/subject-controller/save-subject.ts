/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Subject } from '../../models/subject';

export interface SaveSubject$Params {
      body?: {
'subject'?: Subject;
'file'?: Blob;
}
}

export function saveSubject(http: HttpClient, rootUrl: string, params?: SaveSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<Subject>> {
  const rb = new RequestBuilder(rootUrl, saveSubject.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Subject>;
    })
  );
}

saveSubject.PATH = '/subject';
