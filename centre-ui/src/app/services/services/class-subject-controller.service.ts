/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addClassSubject } from '../fn/class-subject-controller/add-class-subject';
import { AddClassSubject$Params } from '../fn/class-subject-controller/add-class-subject';
import { ApiResponseObject } from '../models/api-response-object';
import { getAllClassSubjects } from '../fn/class-subject-controller/get-all-class-subjects';
import { GetAllClassSubjects$Params } from '../fn/class-subject-controller/get-all-class-subjects';
import { PageResponseClassSubjectResponse } from '../models/page-response-class-subject-response';

@Injectable({ providedIn: 'root' })
export class ClassSubjectControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllClassSubjects()` */
  static readonly GetAllClassSubjectsPath = '/api/class-subjects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllClassSubjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClassSubjects$Response(params?: GetAllClassSubjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClassSubjectResponse>> {
    return getAllClassSubjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllClassSubjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClassSubjects(params?: GetAllClassSubjects$Params, context?: HttpContext): Observable<PageResponseClassSubjectResponse> {
    return this.getAllClassSubjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseClassSubjectResponse>): PageResponseClassSubjectResponse => r.body)
    );
  }

  /** Path part for operation `addClassSubject()` */
  static readonly AddClassSubjectPath = '/api/class-subjects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addClassSubject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addClassSubject$Response(params: AddClassSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return addClassSubject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addClassSubject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addClassSubject(params: AddClassSubject$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.addClassSubject$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
  }

}
