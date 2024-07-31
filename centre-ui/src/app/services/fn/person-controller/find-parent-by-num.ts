/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ParentResponse } from '../../models/parent-response';

export interface FindParentByNum$Params {
  num: string;
}

export function findParentByNum(http: HttpClient, rootUrl: string, params: FindParentByNum$Params, context?: HttpContext): Observable<StrictHttpResponse<ParentResponse>> {
  const rb = new RequestBuilder(rootUrl, findParentByNum.PATH, 'get');
  if (params) {
    rb.query('num', params.num, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ParentResponse>;
    })
  );
}

findParentByNum.PATH = '/person/findParentByNum';
