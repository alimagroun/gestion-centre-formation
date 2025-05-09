/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdminChangePasswordRequest } from '../../models/admin-change-password-request';
import { ApiResponseObject } from '../../models/api-response-object';

export interface AdminChangeUserPassword$Params {
      body: AdminChangePasswordRequest
}

export function adminChangeUserPassword(http: HttpClient, rootUrl: string, params: AdminChangeUserPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
  const rb = new RequestBuilder(rootUrl, adminChangeUserPassword.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiResponseObject>;
    })
  );
}

adminChangeUserPassword.PATH = '/user/admin/change-password';
