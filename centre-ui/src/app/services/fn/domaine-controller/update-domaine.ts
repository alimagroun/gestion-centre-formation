/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponseLong } from '../../models/api-response-long';
import { DomaineRequest } from '../../models/domaine-request';

export interface UpdateDomaine$Params {
  id: number;
      body: DomaineRequest
}

export function updateDomaine(http: HttpClient, rootUrl: string, params: UpdateDomaine$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseLong>> {
  const rb = new RequestBuilder(rootUrl, updateDomaine.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiResponseLong>;
    })
  );
}

updateDomaine.PATH = '/domaine/{id}';
