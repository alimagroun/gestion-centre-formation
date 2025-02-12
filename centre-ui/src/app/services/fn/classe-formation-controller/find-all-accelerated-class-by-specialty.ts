/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {AcceleratedClassResponse} from '../../models/accelerated-class-response';

export interface FindAllAcceleratedClassBySpecialty$Params {
  specialtyId: number;
}

export function findAllAcceleratedClassBySpecialty(http: HttpClient, rootUrl: string, params: FindAllAcceleratedClassBySpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcceleratedClassResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllAcceleratedClassBySpecialty.PATH, 'get');
  if (params) {
    rb.path('specialtyId', params.specialtyId, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AcceleratedClassResponse>>;
    })
  );
}

findAllAcceleratedClassBySpecialty.PATH = '/class/accelerated/specialty/{specialtyId}';
