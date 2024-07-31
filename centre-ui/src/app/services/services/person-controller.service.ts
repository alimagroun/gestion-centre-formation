/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findParentByNum } from '../fn/person-controller/find-parent-by-num';
import { FindParentByNum$Params } from '../fn/person-controller/find-parent-by-num';
import { ParentResponse } from '../models/parent-response';
import { savePerson } from '../fn/person-controller/save-person';
import { SavePerson$Params } from '../fn/person-controller/save-person';

@Injectable({ providedIn: 'root' })
export class PersonControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `savePerson()` */
  static readonly SavePersonPath = '/person/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePerson()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePerson$Response(params: SavePerson$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePerson(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePerson$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePerson(params: SavePerson$Params, context?: HttpContext): Observable<number> {
    return this.savePerson$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findParentByNum()` */
  static readonly FindParentByNumPath = '/person/findParentByNum';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findParentByNum()` instead.
   *
   * This method doesn't expect any request body.
   */
  findParentByNum$Response(params: FindParentByNum$Params, context?: HttpContext): Observable<StrictHttpResponse<ParentResponse>> {
    return findParentByNum(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findParentByNum$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findParentByNum(params: FindParentByNum$Params, context?: HttpContext): Observable<ParentResponse> {
    return this.findParentByNum$Response(params, context).pipe(
      map((r: StrictHttpResponse<ParentResponse>): ParentResponse => r.body)
    );
  }

}
