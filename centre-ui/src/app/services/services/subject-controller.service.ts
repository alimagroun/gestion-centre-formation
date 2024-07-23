/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllSubjects } from '../fn/subject-controller/get-all-subjects';
import { GetAllSubjects$Params } from '../fn/subject-controller/get-all-subjects';
import { PageResponseSubjectResponse } from '../models/page-response-subject-response';

@Injectable({ providedIn: 'root' })
export class SubjectControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllSubjects()` */
  static readonly GetAllSubjectsPath = '/subject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSubjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubjects$Response(params?: GetAllSubjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSubjectResponse>> {
    return getAllSubjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSubjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubjects(params?: GetAllSubjects$Params, context?: HttpContext): Observable<PageResponseSubjectResponse> {
    return this.getAllSubjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseSubjectResponse>): PageResponseSubjectResponse => r.body)
    );
  }

}
