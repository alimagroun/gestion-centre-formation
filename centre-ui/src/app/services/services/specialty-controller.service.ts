/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { create } from '../fn/specialty-controller/create';
import { Create$Params } from '../fn/specialty-controller/create';
import { findAllSpecialty } from '../fn/specialty-controller/find-all-specialty';
import { FindAllSpecialty$Params } from '../fn/specialty-controller/find-all-specialty';
import { PageResponseSpecialtyResponse } from '../models/page-response-specialty-response';

@Injectable({ providedIn: 'root' })
export class SpecialtyControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllSpecialty()` */
  static readonly FindAllSpecialtyPath = '/specialty';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSpecialty()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSpecialty$Response(params?: FindAllSpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSpecialtyResponse>> {
    return findAllSpecialty(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllSpecialty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSpecialty(params?: FindAllSpecialty$Params, context?: HttpContext): Observable<PageResponseSpecialtyResponse> {
    return this.findAllSpecialty$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseSpecialtyResponse>): PageResponseSpecialtyResponse => r.body)
    );
  }

  /** Path part for operation `create()` */
  static readonly CreatePath = '/specialty';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: Create$Params, context?: HttpContext): Observable<number> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
