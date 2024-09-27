/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SchoolYearResponse } from '../../models/school-year-response';

export interface FindAllList$Params {
}

export function findAllList(http: HttpClient, rootUrl: string, params?: FindAllList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SchoolYearResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SchoolYearResponse>>;
    })
  );
}

findAllList.PATH = '/school-years/all';
