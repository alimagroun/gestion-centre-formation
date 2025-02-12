/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {findAll} from '../fn/specialty-controller/find-all';
import {FindAll$Params} from '../fn/specialty-controller/find-all';
import {findAllSpecialtyPageable} from '../fn/specialty-controller/find-all-specialty-pageable';
import {FindAllSpecialtyPageable$Params} from '../fn/specialty-controller/find-all-specialty-pageable';
import {PageResponseSpecialtyResponse} from '../models/page-response-specialty-response';
import {saveSpecialty} from '../fn/specialty-controller/save-specialty';
import {SaveSpecialty$Params} from '../fn/specialty-controller/save-specialty';
import {SpecialtyResponse} from '../models/specialty-response';

@Injectable({providedIn: 'root'})
export class SpecialtyControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllSpecialtyPageable()` */
  static readonly FindAllSpecialtyPageablePath = '/specialty';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSpecialtyPageable()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSpecialtyPageable$Response(params?: FindAllSpecialtyPageable$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSpecialtyResponse>> {
    return findAllSpecialtyPageable(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllSpecialtyPageable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSpecialtyPageable(params?: FindAllSpecialtyPageable$Params, context?: HttpContext): Observable<PageResponseSpecialtyResponse> {
    return this.findAllSpecialtyPageable$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseSpecialtyResponse>): PageResponseSpecialtyResponse => r.body)
    );
  }

  /** Path part for operation `saveSpecialty()` */
  static readonly SaveSpecialtyPath = '/specialty';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveSpecialty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSpecialty$Response(params: SaveSpecialty$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveSpecialty(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveSpecialty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSpecialty(params: SaveSpecialty$Params, context?: HttpContext): Observable<number> {
    return this.saveSpecialty$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/specialty/findAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SpecialtyResponse>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<SpecialtyResponse>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SpecialtyResponse>>): Array<SpecialtyResponse> => r.body)
    );
  }

}
