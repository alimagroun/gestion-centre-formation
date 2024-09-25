/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllClasses } from '../fn/classe-formation-controller/find-all-classes';
import { FindAllClasses$Params } from '../fn/classe-formation-controller/find-all-classes';
import { PageResponseClasseFormationResponse } from '../models/page-response-classe-formation-response';
import { saveClasse } from '../fn/classe-formation-controller/save-classe';
import { SaveClasse$Params } from '../fn/classe-formation-controller/save-classe';

@Injectable({ providedIn: 'root' })
export class ClasseFormationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllClasses()` */
  static readonly FindAllClassesPath = '/classe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllClasses()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClasses$Response(params?: FindAllClasses$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClasseFormationResponse>> {
    return findAllClasses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllClasses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClasses(params?: FindAllClasses$Params, context?: HttpContext): Observable<PageResponseClasseFormationResponse> {
    return this.findAllClasses$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseClasseFormationResponse>): PageResponseClasseFormationResponse => r.body)
    );
  }

  /** Path part for operation `saveClasse()` */
  static readonly SaveClassePath = '/classe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveClasse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClasse$Response(params: SaveClasse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveClasse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveClasse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClasse(params: SaveClasse$Params, context?: HttpContext): Observable<number> {
    return this.saveClasse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
