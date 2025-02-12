/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ApiResponseListClassroomResponse } from '../models/api-response-list-classroom-response';
import { ApiResponseObject } from '../models/api-response-object';
import { getAllClassrooms } from '../fn/classroom-controller/get-all-classrooms';
import { GetAllClassrooms$Params } from '../fn/classroom-controller/get-all-classrooms';
import { getClassroomsPaginated } from '../fn/classroom-controller/get-classrooms-paginated';
import { GetClassroomsPaginated$Params } from '../fn/classroom-controller/get-classrooms-paginated';
import { PageResponseClassroomResponse } from '../models/page-response-classroom-response';
import { saveClassroom } from '../fn/classroom-controller/save-classroom';
import { SaveClassroom$Params } from '../fn/classroom-controller/save-classroom';

@Injectable({ providedIn: 'root' })
export class ClassroomControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllClassrooms()` */
  static readonly GetAllClassroomsPath = '/classrooms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllClassrooms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClassrooms$Response(params?: GetAllClassrooms$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseListClassroomResponse>> {
    return getAllClassrooms(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllClassrooms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClassrooms(params?: GetAllClassrooms$Params, context?: HttpContext): Observable<ApiResponseListClassroomResponse> {
    return this.getAllClassrooms$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseListClassroomResponse>): ApiResponseListClassroomResponse => r.body)
    );
  }

  /** Path part for operation `saveClassroom()` */
  static readonly SaveClassroomPath = '/classrooms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveClassroom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClassroom$Response(params: SaveClassroom$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return saveClassroom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveClassroom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClassroom(params: SaveClassroom$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.saveClassroom$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
  }

  /** Path part for operation `getClassroomsPaginated()` */
  static readonly GetClassroomsPaginatedPath = '/classrooms/paginated';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getClassroomsPaginated()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClassroomsPaginated$Response(params?: GetClassroomsPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClassroomResponse>> {
    return getClassroomsPaginated(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getClassroomsPaginated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClassroomsPaginated(params?: GetClassroomsPaginated$Params, context?: HttpContext): Observable<PageResponseClassroomResponse> {
    return this.getClassroomsPaginated$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseClassroomResponse>): PageResponseClassroomResponse => r.body)
    );
  }

}
