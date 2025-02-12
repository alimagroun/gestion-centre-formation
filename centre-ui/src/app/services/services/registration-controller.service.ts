/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addDocumentToRegistration } from '../fn/registration-controller/add-document-to-registration';
import { AddDocumentToRegistration$Params } from '../fn/registration-controller/add-document-to-registration';
import { assignStudentToAcceleratedClass } from '../fn/registration-controller/assign-student-to-accelerated-class';
import { AssignStudentToAcceleratedClass$Params } from '../fn/registration-controller/assign-student-to-accelerated-class';
import { assignStudentToAccreditedClass } from '../fn/registration-controller/assign-student-to-accredited-class';
import { AssignStudentToAccreditedClass$Params } from '../fn/registration-controller/assign-student-to-accredited-class';
import { findAllRegistrations } from '../fn/registration-controller/find-all-registrations';
import { FindAllRegistrations$Params } from '../fn/registration-controller/find-all-registrations';
import { findRegistrationById } from '../fn/registration-controller/find-registration-by-id';
import { FindRegistrationById$Params } from '../fn/registration-controller/find-registration-by-id';
import { PageResponseRegistrationResponse } from '../models/page-response-registration-response';
import { register } from '../fn/registration-controller/register';
import { Register$Params } from '../fn/registration-controller/register';
import { RegistrationDetailsResponse } from '../models/registration-details-response';
import { updateRegistrationStatus } from '../fn/registration-controller/update-registration-status';
import { UpdateRegistrationStatus$Params } from '../fn/registration-controller/update-registration-status';

@Injectable({ providedIn: 'root' })
export class RegistrationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addDocumentToRegistration()` */
  static readonly AddDocumentToRegistrationPath = '/register/{registrationId}/documents/{documentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDocumentToRegistration()` instead.
   *
   * This method doesn't expect any request body.
   */
  addDocumentToRegistration$Response(params: AddDocumentToRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addDocumentToRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addDocumentToRegistration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addDocumentToRegistration(params: AddDocumentToRegistration$Params, context?: HttpContext): Observable<number> {
    return this.addDocumentToRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
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

  /** Path part for operation `assignStudentToAccreditedClass()` */
  static readonly AssignStudentToAccreditedClassPath = '/register/{registrationId}/students/{studentId}/accredited-classes/{accreditedClassId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignStudentToAccreditedClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignStudentToAccreditedClass$Response(params: AssignStudentToAccreditedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return assignStudentToAccreditedClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `assignStudentToAccreditedClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignStudentToAccreditedClass(params: AssignStudentToAccreditedClass$Params, context?: HttpContext): Observable<number> {
    return this.assignStudentToAccreditedClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `assignStudentToAcceleratedClass()` */
  static readonly AssignStudentToAcceleratedClassPath = '/register/{registrationId}/students/{studentId}/accelerated-classes/{acceleratedClassId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignStudentToAcceleratedClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignStudentToAcceleratedClass$Response(params: AssignStudentToAcceleratedClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return assignStudentToAcceleratedClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `assignStudentToAcceleratedClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignStudentToAcceleratedClass(params: AssignStudentToAcceleratedClass$Params, context?: HttpContext): Observable<number> {
    return this.assignStudentToAcceleratedClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateRegistrationStatus()` */
  static readonly UpdateRegistrationStatusPath = '/register/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRegistrationStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRegistrationStatus$Response(params: UpdateRegistrationStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateRegistrationStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRegistrationStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRegistrationStatus(params: UpdateRegistrationStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateRegistrationStatus$Response(params, context).pipe(
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
