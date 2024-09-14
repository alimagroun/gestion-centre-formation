/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DocumentResponse } from '../../models/document-response';

export interface FindAllDocuments$Params {
}

export function findAllDocuments(http: HttpClient, rootUrl: string, params?: FindAllDocuments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DocumentResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllDocuments.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DocumentResponse>>;
    })
  );
}

findAllDocuments.PATH = '/document/findAll';
