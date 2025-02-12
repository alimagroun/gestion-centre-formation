/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {SpecialtyRequest} from '../../models/specialty-request';

export interface SaveSpecialty$Params {
  body: SpecialtyRequest
}

export function saveSpecialty(http: HttpClient, rootUrl: string, params: SaveSpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, saveSpecialty.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({body: parseFloat(String((r as HttpResponse<any>).body))}) as StrictHttpResponse<number>;
    })
  );
}

saveSpecialty.PATH = '/specialty';
