/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFormationResponse } from '../../models/page-response-formation-response';

export interface FindAllFormations$Params {
  page?: number;
  size?: number;
}

export function findAllFormations(http: HttpClient, rootUrl: string, params?: FindAllFormations$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFormationResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFormations.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFormationResponse>;
    })
  );
}

findAllFormations.PATH = '/formation';
