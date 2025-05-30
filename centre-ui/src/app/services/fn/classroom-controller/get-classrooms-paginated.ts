/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseClassroomResponse } from '../../models/page-response-classroom-response';

export interface GetClassroomsPaginated$Params {
  page?: number;
  size?: number;
}

export function getClassroomsPaginated(http: HttpClient, rootUrl: string, params?: GetClassroomsPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClassroomResponse>> {
  const rb = new RequestBuilder(rootUrl, getClassroomsPaginated.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseClassroomResponse>;
    })
  );
}

getClassroomsPaginated.PATH = '/classrooms/paginated';
