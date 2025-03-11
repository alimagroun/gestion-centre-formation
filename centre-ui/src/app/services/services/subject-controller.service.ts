/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ApiResponseObject } from '../models/api-response-object';
import { createSubject } from '../fn/subject-controller/create-subject';
import { CreateSubject$Params } from '../fn/subject-controller/create-subject';

@Injectable({ providedIn: 'root' })
export class SubjectControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createSubject()` */
  static readonly CreateSubjectPath = '/subject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSubject()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createSubject$Response(params?: CreateSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return createSubject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createSubject$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createSubject(params?: CreateSubject$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.createSubject$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
  }

}
