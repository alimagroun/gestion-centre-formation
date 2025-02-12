/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddDocumentToRegistration$Params {
  registrationId: number;
  documentId: number;
}

export function addDocumentToRegistration(http: HttpClient, rootUrl: string, params: AddDocumentToRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, addDocumentToRegistration.PATH, 'put');
  if (params) {
    rb.path('registrationId', params.registrationId, {});
    rb.path('documentId', params.documentId, {});
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

addDocumentToRegistration.PATH = '/register/{registrationId}/documents/{documentId}';
