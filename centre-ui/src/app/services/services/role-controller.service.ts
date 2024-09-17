/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllRoles } from '../fn/role-controller/find-all-roles';
import { FindAllRoles$Params } from '../fn/role-controller/find-all-roles';
import { PageResponseRoleResponse } from '../models/page-response-role-response';
import { saveRole } from '../fn/role-controller/save-role';
import { SaveRole$Params } from '../fn/role-controller/save-role';

@Injectable({ providedIn: 'root' })
export class RoleControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllRoles()` */
  static readonly FindAllRolesPath = '/role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRoles$Response(params?: FindAllRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoleResponse>> {
    return findAllRoles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRoles(params?: FindAllRoles$Params, context?: HttpContext): Observable<PageResponseRoleResponse> {
    return this.findAllRoles$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRoleResponse>): PageResponseRoleResponse => r.body)
    );
  }

  /** Path part for operation `saveRole()` */
  static readonly SaveRolePath = '/role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveRole$Response(params: SaveRole$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveRole(params: SaveRole$Params, context?: HttpContext): Observable<number> {
    return this.saveRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
