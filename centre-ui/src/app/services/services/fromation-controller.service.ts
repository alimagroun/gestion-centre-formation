/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllFormation } from '../fn/fromation-controller/find-all-formation';
import { FindAllFormation$Params } from '../fn/fromation-controller/find-all-formation';
import { PageResponseFormationResponse } from '../models/page-response-formation-response';
import { saveFormation } from '../fn/fromation-controller/save-formation';
import { SaveFormation$Params } from '../fn/fromation-controller/save-formation';

@Injectable({ providedIn: 'root' })
export class FromationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllFormation()` */
  static readonly FindAllFormationPath = '/formation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFormation()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFormation$Response(params?: FindAllFormation$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFormationResponse>> {
    return findAllFormation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFormation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFormation(params?: FindAllFormation$Params, context?: HttpContext): Observable<PageResponseFormationResponse> {
    return this.findAllFormation$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFormationResponse>): PageResponseFormationResponse => r.body)
    );
  }

  /** Path part for operation `saveFormation()` */
  static readonly SaveFormationPath = '/formation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFormation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFormation$Response(params: SaveFormation$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveFormation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFormation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFormation(params: SaveFormation$Params, context?: HttpContext): Observable<number> {
    return this.saveFormation$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
