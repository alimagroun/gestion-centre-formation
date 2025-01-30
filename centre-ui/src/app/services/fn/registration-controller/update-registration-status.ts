/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateRegistrationStatus$Params {
  registrationId: number;
  statusChangeReason: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export function updateRegistrationStatus(http: HttpClient, rootUrl: string, params: UpdateRegistrationStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateRegistrationStatus.PATH, 'patch');
  if (params) {
    rb.query('registrationId', params.registrationId, {});
    rb.query('statusChangeReason', params.statusChangeReason, {});
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

updateRegistrationStatus.PATH = '/register/status';
