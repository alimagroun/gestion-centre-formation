/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createDomain } from '../fn/domain-controller/create-domain';
import { CreateDomain$Params } from '../fn/domain-controller/create-domain';
import { findAllDomains } from '../fn/domain-controller/find-all-domains';
import { FindAllDomains$Params } from '../fn/domain-controller/find-all-domains';
import { PageResponseDomainResponse } from '../models/page-response-domain-response';

@Injectable({ providedIn: 'root' })
export class DomainControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllDomains()` */
  static readonly FindAllDomainsPath = '/domain';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllDomains()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDomains$Response(params?: FindAllDomains$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDomainResponse>> {
    return findAllDomains(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllDomains$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDomains(params?: FindAllDomains$Params, context?: HttpContext): Observable<PageResponseDomainResponse> {
    return this.findAllDomains$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDomainResponse>): PageResponseDomainResponse => r.body)
    );
  }

  /** Path part for operation `createDomain()` */
  static readonly CreateDomainPath = '/domain';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDomain()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDomain$Response(params: CreateDomain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createDomain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createDomain$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDomain(params: CreateDomain$Params, context?: HttpContext): Observable<number> {
    return this.createDomain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
