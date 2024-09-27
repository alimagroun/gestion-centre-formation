/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FormationResponse } from '../../models/formation-response';

export interface FindAllFormationsList$Params {
}

export function findAllFormationsList(http: HttpClient, rootUrl: string, params?: FindAllFormationsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FormationResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllFormationsList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FormationResponse>>;
    })
  );
}

findAllFormationsList.PATH = '/formation/allList';
