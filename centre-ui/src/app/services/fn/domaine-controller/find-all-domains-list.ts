/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DomaineResponse } from '../../models/domaine-response';

export interface FindAllDomainsList$Params {
}

export function findAllDomainsList(http: HttpClient, rootUrl: string, params?: FindAllDomainsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DomaineResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllDomainsList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DomaineResponse>>;
    })
  );
}

findAllDomainsList.PATH = '/domaine/allList';
