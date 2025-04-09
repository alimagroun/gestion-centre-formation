/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponseObject } from '../../models/api-response-object';

export interface ChangePasswordFirstLogin$Params {
  newPassword: string;
}

export function changePasswordFirstLogin(http: HttpClient, rootUrl: string, params: ChangePasswordFirstLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
  const rb = new RequestBuilder(rootUrl, changePasswordFirstLogin.PATH, 'post');
  if (params) {
    rb.query('newPassword', params.newPassword, {});
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

changePasswordFirstLogin.PATH = '/user/first-login/change-password';
