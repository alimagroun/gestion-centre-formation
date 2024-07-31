/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllDocuments } from '../fn/documents-controller/find-all-documents';
import { FindAllDocuments$Params } from '../fn/documents-controller/find-all-documents';
import { PageResponseDocumentResponse } from '../models/page-response-document-response';
import { saveDocument } from '../fn/documents-controller/save-document';
import { SaveDocument$Params } from '../fn/documents-controller/save-document';

@Injectable({ providedIn: 'root' })
export class DocumentsControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllDocuments()` */
  static readonly FindAllDocumentsPath = '/document';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllDocuments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDocuments$Response(params?: FindAllDocuments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDocumentResponse>> {
    return findAllDocuments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllDocuments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDocuments(params?: FindAllDocuments$Params, context?: HttpContext): Observable<PageResponseDocumentResponse> {
    return this.findAllDocuments$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDocumentResponse>): PageResponseDocumentResponse => r.body)
    );
  }

  /** Path part for operation `saveDocument()` */
  static readonly SaveDocumentPath = '/document';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveDocument()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDocument$Response(params: SaveDocument$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveDocument(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveDocument$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDocument(params: SaveDocument$Params, context?: HttpContext): Observable<number> {
    return this.saveDocument$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
