/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllRegistrations } from '../fn/registration-controller/find-all-registrations';
import { FindAllRegistrations$Params } from '../fn/registration-controller/find-all-registrations';
import { findRegistrationById } from '../fn/registration-controller/find-registration-by-id';
import { FindRegistrationById$Params } from '../fn/registration-controller/find-registration-by-id';
import { PageResponseRegistrationResponse } from '../models/page-response-registration-response';
import { register } from '../fn/registration-controller/register';
import { Register$Params } from '../fn/registration-controller/register';
import { RegistrationDetailsResponse } from '../models/registration-details-response';

@Injectable({ providedIn: 'root' })
export class RegistrationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllRegistrations()` */
  static readonly FindAllRegistrationsPath = '/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRegistrations()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRegistrations$Response(params?: FindAllRegistrations$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRegistrationResponse>> {
    return findAllRegistrations(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllRegistrations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRegistrations(params?: FindAllRegistrations$Params, context?: HttpContext): Observable<PageResponseRegistrationResponse> {
    return this.findAllRegistrations$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRegistrationResponse>): PageResponseRegistrationResponse => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<number> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findRegistrationById()` */
  static readonly FindRegistrationByIdPath = '/register/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRegistrationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRegistrationById$Response(params: FindRegistrationById$Params, context?: HttpContext): Observable<StrictHttpResponse<RegistrationDetailsResponse>> {
    return findRegistrationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findRegistrationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRegistrationById(params: FindRegistrationById$Params, context?: HttpContext): Observable<RegistrationDetailsResponse> {
    return this.findRegistrationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<RegistrationDetailsResponse>): RegistrationDetailsResponse => r.body)
    );
  }

}
