/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ApiResponseLong } from '../models/api-response-long';
import { ApiResponseVoid } from '../models/api-response-void';
import { deleteDomain } from '../fn/domaine-controller/delete-domain';
import { DeleteDomain$Params } from '../fn/domaine-controller/delete-domain';
import { DomaineResponse } from '../models/domaine-response';
import { findAllDomain } from '../fn/domaine-controller/find-all-domain';
import { FindAllDomain$Params } from '../fn/domaine-controller/find-all-domain';
import { findAllDomainsList } from '../fn/domaine-controller/find-all-domains-list';
import { FindAllDomainsList$Params } from '../fn/domaine-controller/find-all-domains-list';
import { PageResponseDomaineResponse } from '../models/page-response-domaine-response';
import { saveDomain } from '../fn/domaine-controller/save-domain';
import { SaveDomain$Params } from '../fn/domaine-controller/save-domain';
import { updateDomaine } from '../fn/domaine-controller/update-domaine';
import { UpdateDomaine$Params } from '../fn/domaine-controller/update-domaine';

@Injectable({ providedIn: 'root' })
export class DomaineControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateDomaine()` */
  static readonly UpdateDomainePath = '/domaine/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDomaine()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDomaine$Response(params: UpdateDomaine$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseLong>> {
    return updateDomaine(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDomaine$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDomaine(params: UpdateDomaine$Params, context?: HttpContext): Observable<ApiResponseLong> {
    return this.updateDomaine$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseLong>): ApiResponseLong => r.body)
    );
  }

  /** Path part for operation `deleteDomain()` */
  static readonly DeleteDomainPath = '/domaine/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDomain$Response(params: DeleteDomain$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseVoid>> {
    return deleteDomain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDomain(params: DeleteDomain$Params, context?: HttpContext): Observable<ApiResponseVoid> {
    return this.deleteDomain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseVoid>): ApiResponseVoid => r.body)
    );
  }

  /** Path part for operation `findAllDomain()` */
  static readonly FindAllDomainPath = '/domaine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDomain$Response(params?: FindAllDomain$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDomaineResponse>> {
    return findAllDomain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDomain(params?: FindAllDomain$Params, context?: HttpContext): Observable<PageResponseDomaineResponse> {
    return this.findAllDomain$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDomaineResponse>): PageResponseDomaineResponse => r.body)
    );
  }

  /** Path part for operation `saveDomain()` */
  static readonly SaveDomainPath = '/domaine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveDomain()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDomain$Response(params: SaveDomain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveDomain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveDomain$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDomain(params: SaveDomain$Params, context?: HttpContext): Observable<number> {
    return this.saveDomain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllDomainsList()` */
  static readonly FindAllDomainsListPath = '/domaine/allList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllDomainsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDomainsList$Response(params?: FindAllDomainsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DomaineResponse>>> {
    return findAllDomainsList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllDomainsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDomainsList(params?: FindAllDomainsList$Params, context?: HttpContext): Observable<Array<DomaineResponse>> {
    return this.findAllDomainsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DomaineResponse>>): Array<DomaineResponse> => r.body)
    );
  }

}
