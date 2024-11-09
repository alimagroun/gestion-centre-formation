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
import { AcceleratedClassResponse } from '../models/accelerated-class-response';
import { AccreditedClassResponse } from '../models/accredited-class-response';
import { ClassStudentResponse } from '../models/class-student-response';
import { findAllAcceleratedClass } from '../fn/classe-formation-controller/find-all-accelerated-class';
import { FindAllAcceleratedClass$Params } from '../fn/classe-formation-controller/find-all-accelerated-class';
import { findAllAcceleratedClassBySpecialty } from '../fn/classe-formation-controller/find-all-accelerated-class-by-specialty';
import { FindAllAcceleratedClassBySpecialty$Params } from '../fn/classe-formation-controller/find-all-accelerated-class-by-specialty';
import { findAllAcceleratedClasses } from '../fn/classe-formation-controller/find-all-accelerated-classes';
import { FindAllAcceleratedClasses$Params } from '../fn/classe-formation-controller/find-all-accelerated-classes';
import { findAllAccreditedClass } from '../fn/classe-formation-controller/find-all-accredited-class';
import { FindAllAccreditedClass$Params } from '../fn/classe-formation-controller/find-all-accredited-class';
import { findAllAccreditedClassBySpecialty } from '../fn/classe-formation-controller/find-all-accredited-class-by-specialty';
import { FindAllAccreditedClassBySpecialty$Params } from '../fn/classe-formation-controller/find-all-accredited-class-by-specialty';
import { findAllStudentByAcceleratedClassId } from '../fn/classe-formation-controller/find-all-student-by-accelerated-class-id';
import { FindAllStudentByAcceleratedClassId$Params } from '../fn/classe-formation-controller/find-all-student-by-accelerated-class-id';
import { findAllStudentByAccreditedClassId } from '../fn/classe-formation-controller/find-all-student-by-accredited-class-id';
import { FindAllStudentByAccreditedClassId$Params } from '../fn/classe-formation-controller/find-all-student-by-accredited-class-id';
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
  static readonly FindAllAccreditedClassPath = '/class/accredited';

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
  static readonly SaveAccreditedClassPath = '/class/accredited';

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
  static readonly FindAllAcceleratedClassPath = '/class/accelerated';

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
  static readonly SaveAcceleratedClassPath = '/class/accelerated';

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

  /** Path part for operation `findAllStudentByAccreditedClassId()` */
  static readonly FindAllStudentByAccreditedClassIdPath = '/class/accredited/{classId}/students';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllStudentByAccreditedClassId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentByAccreditedClassId$Response(params: FindAllStudentByAccreditedClassId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ClassStudentResponse>>> {
    return findAllStudentByAccreditedClassId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllStudentByAccreditedClassId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentByAccreditedClassId(params: FindAllStudentByAccreditedClassId$Params, context?: HttpContext): Observable<Array<ClassStudentResponse>> {
    return this.findAllStudentByAccreditedClassId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ClassStudentResponse>>): Array<ClassStudentResponse> => r.body)
    );
  }

  /** Path part for operation `findAllAccreditedClassBySpecialty()` */
  static readonly FindAllAccreditedClassBySpecialtyPath = '/class/accredited/specialty/{specialtyId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAccreditedClassBySpecialty()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAccreditedClassBySpecialty$Response(params: FindAllAccreditedClassBySpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AccreditedClassResponse>>> {
    return findAllAccreditedClassBySpecialty(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAccreditedClassBySpecialty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAccreditedClassBySpecialty(params: FindAllAccreditedClassBySpecialty$Params, context?: HttpContext): Observable<Array<AccreditedClassResponse>> {
    return this.findAllAccreditedClassBySpecialty$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AccreditedClassResponse>>): Array<AccreditedClassResponse> => r.body)
    );
  }

  /** Path part for operation `findAllStudentByAcceleratedClassId()` */
  static readonly FindAllStudentByAcceleratedClassIdPath = '/class/accelerated/{classId}/students';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllStudentByAcceleratedClassId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentByAcceleratedClassId$Response(params: FindAllStudentByAcceleratedClassId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ClassStudentResponse>>> {
    return findAllStudentByAcceleratedClassId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllStudentByAcceleratedClassId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentByAcceleratedClassId(params: FindAllStudentByAcceleratedClassId$Params, context?: HttpContext): Observable<Array<ClassStudentResponse>> {
    return this.findAllStudentByAcceleratedClassId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ClassStudentResponse>>): Array<ClassStudentResponse> => r.body)
    );
  }

  /** Path part for operation `findAllAcceleratedClassBySpecialty()` */
  static readonly FindAllAcceleratedClassBySpecialtyPath = '/class/accelerated/specialty/{specialtyId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAcceleratedClassBySpecialty()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcceleratedClassBySpecialty$Response(params: FindAllAcceleratedClassBySpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcceleratedClassResponse>>> {
    return findAllAcceleratedClassBySpecialty(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAcceleratedClassBySpecialty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcceleratedClassBySpecialty(params: FindAllAcceleratedClassBySpecialty$Params, context?: HttpContext): Observable<Array<AcceleratedClassResponse>> {
    return this.findAllAcceleratedClassBySpecialty$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AcceleratedClassResponse>>): Array<AcceleratedClassResponse> => r.body)
    );
  }

  /** Path part for operation `findAllAcceleratedClasses()` */
  static readonly FindAllAcceleratedClassesPath = '/class/accelerated/all';

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
