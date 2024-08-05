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
import { saveSubject } from '../fn/subject-controller/save-subject';
import { SaveSubject$Params } from '../fn/subject-controller/save-subject';
import { Subject } from '../models/subject';

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

  /** Path part for operation `saveSubject()` */
  static readonly SaveSubjectPath = '/subject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveSubject()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  saveSubject$Response(params?: SaveSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<Subject>> {
    return saveSubject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveSubject$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  saveSubject(params?: SaveSubject$Params, context?: HttpContext): Observable<Subject> {
    return this.saveSubject$Response(params, context).pipe(
      map((r: StrictHttpResponse<Subject>): Subject => r.body)
    );
  }

}
