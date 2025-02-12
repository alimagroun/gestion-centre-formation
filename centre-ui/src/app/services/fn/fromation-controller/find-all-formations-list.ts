/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FormationTypeResponse } from '../../models/formation-type-response';

export interface FindAllFormationsList$Params {
}

export function findAllFormationsList(http: HttpClient, rootUrl: string, params?: FindAllFormationsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FormationTypeResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllFormationsList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FormationTypeResponse>>;
    })
  );
}

findAllFormationsList.PATH = '/formation/allList';
