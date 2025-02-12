/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';


export interface PhoneNumberValidation$Params {
  phoneNumber: string;
}

export function phoneNumberValidation(http: HttpClient, rootUrl: string, params: PhoneNumberValidation$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, phoneNumberValidation.PATH, 'get');
  if (params) {
    rb.query('phoneNumber', params.phoneNumber, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({body: String((r as HttpResponse<any>).body) === 'true'}) as StrictHttpResponse<boolean>;
    })
  );
}

phoneNumberValidation.PATH = '/person/validation/phone-number';
