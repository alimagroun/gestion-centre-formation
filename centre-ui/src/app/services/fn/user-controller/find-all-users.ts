/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseUserResponse } from '../../models/page-response-user-response';
import { UserFilterRequest } from '../../models/user-filter-request';

export interface FindAllUsers$Params {
  page?: number;
  size?: number;
      body: UserFilterRequest
}

export function findAllUsers(http: HttpClient, rootUrl: string, params: FindAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllUsers.PATH, 'post');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseUserResponse>;
    })
  );
}

findAllUsers.PATH = '/user';
