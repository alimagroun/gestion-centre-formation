/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponseListClassroomResponse } from '../../models/api-response-list-classroom-response';

export interface GetAllClassrooms$Params {
}

export function getAllClassrooms(http: HttpClient, rootUrl: string, params?: GetAllClassrooms$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseListClassroomResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllClassrooms.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiResponseListClassroomResponse>;
    })
  );
}

getAllClassrooms.PATH = '/classrooms';
