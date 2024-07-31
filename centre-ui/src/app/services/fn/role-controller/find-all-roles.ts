/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseRoleResponse } from '../../models/page-response-role-response';

export interface FindAllRoles$Params {
  page?: number;
  size?: number;
}

export function findAllRoles(http: HttpClient, rootUrl: string, params?: FindAllRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoleResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllRoles.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseRoleResponse>;
    })
  );
}

findAllRoles.PATH = '/role';
