/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AccreditedClassResponse } from '../../models/accredited-class-response';

export interface FindAllAccreditedClassBySpecialty$Params {
  specialtyId: number;
}

export function findAllAccreditedClassBySpecialty(http: HttpClient, rootUrl: string, params: FindAllAccreditedClassBySpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AccreditedClassResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllAccreditedClassBySpecialty.PATH, 'get');
  if (params) {
    rb.path('specialtyId', params.specialtyId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AccreditedClassResponse>>;
    })
  );
}

findAllAccreditedClassBySpecialty.PATH = '/class/accredited/specialty/{specialtyId}';
