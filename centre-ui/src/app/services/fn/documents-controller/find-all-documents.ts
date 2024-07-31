/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseDocumentResponse } from '../../models/page-response-document-response';

export interface FindAllDocuments$Params {
  page?: number;
  size?: number;
}

export function findAllDocuments(http: HttpClient, rootUrl: string, params?: FindAllDocuments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDocumentResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllDocuments.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseDocumentResponse>;
    })
  );
}

findAllDocuments.PATH = '/document';
