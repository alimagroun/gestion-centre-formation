/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseAcceleratedClassResponse } from '../../models/page-response-accelerated-class-response';

export interface FindAllAcceleratedClass$Params {
  page?: number;
  size?: number;
}

export function findAllAcceleratedClass(http: HttpClient, rootUrl: string, params?: FindAllAcceleratedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAcceleratedClassResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllAcceleratedClass.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseAcceleratedClassResponse>;
    })
  );
}

findAllAcceleratedClass.PATH = '/class/accelerated';
