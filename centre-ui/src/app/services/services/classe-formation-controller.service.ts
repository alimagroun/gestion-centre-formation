/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AcceleratedClass } from '../models/accelerated-class';
import { AcceleratedClassEntry } from '../models/accelerated-class-entry';
import { addEntry } from '../fn/classe-formation-controller/add-entry';
import { AddEntry$Params } from '../fn/classe-formation-controller/add-entry';
import { findAllAcceleratedClass } from '../fn/classe-formation-controller/find-all-accelerated-class';
import { FindAllAcceleratedClass$Params } from '../fn/classe-formation-controller/find-all-accelerated-class';
import { findAllAcceleratedClasses } from '../fn/classe-formation-controller/find-all-accelerated-classes';
import { FindAllAcceleratedClasses$Params } from '../fn/classe-formation-controller/find-all-accelerated-classes';
import { findAllAccreditedClass } from '../fn/classe-formation-controller/find-all-accredited-class';
import { FindAllAccreditedClass$Params } from '../fn/classe-formation-controller/find-all-accredited-class';
import { PageResponseAcceleratedClassResponse } from '../models/page-response-accelerated-class-response';
import { PageResponseAccreditedClassResponse } from '../models/page-response-accredited-class-response';
import { saveAcceleratedClass } from '../fn/classe-formation-controller/save-accelerated-class';
import { SaveAcceleratedClass$Params } from '../fn/classe-formation-controller/save-accelerated-class';
import { saveAccreditedClass } from '../fn/classe-formation-controller/save-accredited-class';
import { SaveAccreditedClass$Params } from '../fn/classe-formation-controller/save-accredited-class';

@Injectable({ providedIn: 'root' })
export class ClasseFormationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllAccreditedClass()` */
  static readonly FindAllAccreditedClassPath = '/classe/accredited-classes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAccreditedClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAccreditedClass$Response(params?: FindAllAccreditedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAccreditedClassResponse>> {
    return findAllAccreditedClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAccreditedClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAccreditedClass(params?: FindAllAccreditedClass$Params, context?: HttpContext): Observable<PageResponseAccreditedClassResponse> {
    return this.findAllAccreditedClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAccreditedClassResponse>): PageResponseAccreditedClassResponse => r.body)
    );
  }

  /** Path part for operation `saveAccreditedClass()` */
  static readonly SaveAccreditedClassPath = '/classe/accredited-classes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAccreditedClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAccreditedClass$Response(params: SaveAccreditedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveAccreditedClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveAccreditedClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAccreditedClass(params: SaveAccreditedClass$Params, context?: HttpContext): Observable<number> {
    return this.saveAccreditedClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllAcceleratedClass()` */
  static readonly FindAllAcceleratedClassPath = '/classe/accelerated-classes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAcceleratedClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcceleratedClass$Response(params?: FindAllAcceleratedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAcceleratedClassResponse>> {
    return findAllAcceleratedClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAcceleratedClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcceleratedClass(params?: FindAllAcceleratedClass$Params, context?: HttpContext): Observable<PageResponseAcceleratedClassResponse> {
    return this.findAllAcceleratedClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAcceleratedClassResponse>): PageResponseAcceleratedClassResponse => r.body)
    );
  }

  /** Path part for operation `saveAcceleratedClass()` */
  static readonly SaveAcceleratedClassPath = '/classe/accelerated-classes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAcceleratedClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAcceleratedClass$Response(params: SaveAcceleratedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveAcceleratedClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveAcceleratedClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAcceleratedClass(params: SaveAcceleratedClass$Params, context?: HttpContext): Observable<number> {
    return this.saveAcceleratedClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `addEntry()` */
  static readonly AddEntryPath = '/classe/accelerated-classes/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEntry()` instead.
   *
   * This method doesn't expect any request body.
   */
  addEntry$Response(params: AddEntry$Params, context?: HttpContext): Observable<StrictHttpResponse<AcceleratedClassEntry>> {
    return addEntry(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEntry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addEntry(params: AddEntry$Params, context?: HttpContext): Observable<AcceleratedClassEntry> {
    return this.addEntry$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcceleratedClassEntry>): AcceleratedClassEntry => r.body)
    );
  }

  /** Path part for operation `findAllAcceleratedClasses()` */
  static readonly FindAllAcceleratedClassesPath = '/classe/accelerated-classes/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAcceleratedClasses()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcceleratedClasses$Response(params?: FindAllAcceleratedClasses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcceleratedClass>>> {
    return findAllAcceleratedClasses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAcceleratedClasses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcceleratedClasses(params?: FindAllAcceleratedClasses$Params, context?: HttpContext): Observable<Array<AcceleratedClass>> {
    return this.findAllAcceleratedClasses$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AcceleratedClass>>): Array<AcceleratedClass> => r.body)
    );
  }

}
