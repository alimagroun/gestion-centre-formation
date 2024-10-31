/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcceleratedClassEntry } from '../../models/accelerated-class-entry';

export interface AddEntry$Params {
  studentId: number;
  classId: number;
}

export function addEntry(http: HttpClient, rootUrl: string, params: AddEntry$Params, context?: HttpContext): Observable<StrictHttpResponse<AcceleratedClassEntry>> {
  const rb = new RequestBuilder(rootUrl, addEntry.PATH, 'post');
  if (params) {
    rb.query('studentId', params.studentId, {});
    rb.query('classId', params.classId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AcceleratedClassEntry>;
    })
  );
}

addEntry.PATH = '/classe/accelerated-classes/add';
