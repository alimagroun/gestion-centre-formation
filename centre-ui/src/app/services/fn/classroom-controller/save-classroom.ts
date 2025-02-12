/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponseObject } from '../../models/api-response-object';
import { ClassroomRequest } from '../../models/classroom-request';

export interface SaveClassroom$Params {
      body: ClassroomRequest
}

export function saveClassroom(http: HttpClient, rootUrl: string, params: SaveClassroom$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
  const rb = new RequestBuilder(rootUrl, saveClassroom.PATH, 'post');
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

saveClassroom.PATH = '/classrooms';
