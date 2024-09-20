/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll } from '../fn/school-year-controller/find-all';
import { FindAll$Params } from '../fn/school-year-controller/find-all';
import { findById } from '../fn/school-year-controller/find-by-id';
import { FindById$Params } from '../fn/school-year-controller/find-by-id';
import { PageResponseSchoolYearResponse } from '../models/page-response-school-year-response';
import { save } from '../fn/school-year-controller/save';
import { Save$Params } from '../fn/school-year-controller/save';
import { SchoolYearResponse } from '../models/school-year-response';
import { setDefault } from '../fn/school-year-controller/set-default';
import { SetDefault$Params } from '../fn/school-year-controller/set-default';

@Injectable({ providedIn: 'root' })
export class SchoolYearControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setDefault()` */
  static readonly SetDefaultPath = '/school-years/{id}/default';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setDefault()` instead.
   *
   * This method doesn't expect any request body.
   */
  setDefault$Response(params: SetDefault$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return setDefault(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setDefault$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setDefault(params: SetDefault$Params, context?: HttpContext): Observable<void> {
    return this.setDefault$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/school-years';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSchoolYearResponse>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<PageResponseSchoolYearResponse> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseSchoolYearResponse>): PageResponseSchoolYearResponse => r.body)
    );
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/school-years';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: Save$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: Save$Params, context?: HttpContext): Observable<number> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/school-years/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<SchoolYearResponse>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<SchoolYearResponse> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<SchoolYearResponse>): SchoolYearResponse => r.body)
    );
  }

}