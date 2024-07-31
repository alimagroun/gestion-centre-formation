/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createFormation } from '../fn/formation-controller/create-formation';
import { CreateFormation$Params } from '../fn/formation-controller/create-formation';
import { findAllFormations } from '../fn/formation-controller/find-all-formations';
import { FindAllFormations$Params } from '../fn/formation-controller/find-all-formations';
import { PageResponseFormationResponse } from '../models/page-response-formation-response';

@Injectable({ providedIn: 'root' })
export class FormationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllFormations()` */
  static readonly FindAllFormationsPath = '/formation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFormations()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFormations$Response(params?: FindAllFormations$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFormationResponse>> {
    return findAllFormations(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFormations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFormations(params?: FindAllFormations$Params, context?: HttpContext): Observable<PageResponseFormationResponse> {
    return this.findAllFormations$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFormationResponse>): PageResponseFormationResponse => r.body)
    );
  }

  /** Path part for operation `createFormation()` */
  static readonly CreateFormationPath = '/formation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFormation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFormation$Response(params: CreateFormation$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createFormation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFormation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFormation(params: CreateFormation$Params, context?: HttpContext): Observable<number> {
    return this.createFormation$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
