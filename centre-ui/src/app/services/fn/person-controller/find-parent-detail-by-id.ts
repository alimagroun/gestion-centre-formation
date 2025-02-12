/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {ParentDetailResponse} from '../../models/parent-detail-response';

export interface FindParentDetailById$Params {
  parentId: number;
}

export function findParentDetailById(http: HttpClient, rootUrl: string, params: FindParentDetailById$Params, context?: HttpContext): Observable<StrictHttpResponse<ParentDetailResponse>> {
  const rb = new RequestBuilder(rootUrl, findParentDetailById.PATH, 'get');
  if (params) {
    rb.path('parentId', params.parentId, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ParentDetailResponse>;
    })
  );
}

findParentDetailById.PATH = '/person/parent/{parentId}';
