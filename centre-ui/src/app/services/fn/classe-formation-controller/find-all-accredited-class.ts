/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseAccreditedClassResponse } from '../../models/page-response-accredited-class-response';

export interface FindAllAccreditedClass$Params {
  page?: number;
  size?: number;
}

export function findAllAccreditedClass(http: HttpClient, rootUrl: string, params?: FindAllAccreditedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAccreditedClassResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllAccreditedClass.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseAccreditedClassResponse>;
    })
  );
}

findAllAccreditedClass.PATH = '/classe/accredited-classes';
