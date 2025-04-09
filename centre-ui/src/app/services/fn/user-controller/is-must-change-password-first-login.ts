/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponseObject } from '../../models/api-response-object';

export interface IsMustChangePasswordFirstLogin$Params {
}

export function isMustChangePasswordFirstLogin(http: HttpClient, rootUrl: string, params?: IsMustChangePasswordFirstLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
  const rb = new RequestBuilder(rootUrl, isMustChangePasswordFirstLogin.PATH, 'get');
  if (params) {
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

isMustChangePasswordFirstLogin.PATH = '/user/first-login/must-change-password';
