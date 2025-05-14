/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { adminChangeUserPassword } from '../fn/user-controller/admin-change-user-password';
import { AdminChangeUserPassword$Params } from '../fn/user-controller/admin-change-user-password';
import { ApiResponseObject } from '../models/api-response-object';
import { changePasswordFirstLogin } from '../fn/user-controller/change-password-first-login';
import { ChangePasswordFirstLogin$Params } from '../fn/user-controller/change-password-first-login';
import { findAllUsers } from '../fn/user-controller/find-all-users';
import { FindAllUsers$Params } from '../fn/user-controller/find-all-users';
import { isMustChangePasswordFirstLogin } from '../fn/user-controller/is-must-change-password-first-login';
import { IsMustChangePasswordFirstLogin$Params } from '../fn/user-controller/is-must-change-password-first-login';
import { PageResponseUserResponse } from '../models/page-response-user-response';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllUsers()` */
  static readonly FindAllUsersPath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUsers()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  findAllUsers$Response(params: FindAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return findAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUsers$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  findAllUsers(params: FindAllUsers$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.findAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

  /** Path part for operation `changePasswordFirstLogin()` */
  static readonly ChangePasswordFirstLoginPath = '/user/first-login/change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePasswordFirstLogin()` instead.
   *
   * This method doesn't expect any request body.
   */
  changePasswordFirstLogin$Response(params: ChangePasswordFirstLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return changePasswordFirstLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePasswordFirstLogin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changePasswordFirstLogin(params: ChangePasswordFirstLogin$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.changePasswordFirstLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
  }

  /** Path part for operation `adminChangeUserPassword()` */
  static readonly AdminChangeUserPasswordPath = '/user/admin/change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminChangeUserPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminChangeUserPassword$Response(params: AdminChangeUserPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return adminChangeUserPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminChangeUserPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminChangeUserPassword(params: AdminChangeUserPassword$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.adminChangeUserPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
  }

  /** Path part for operation `isMustChangePasswordFirstLogin()` */
  static readonly IsMustChangePasswordFirstLoginPath = '/user/first-login/must-change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isMustChangePasswordFirstLogin()` instead.
   *
   * This method doesn't expect any request body.
   */
  isMustChangePasswordFirstLogin$Response(params?: IsMustChangePasswordFirstLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return isMustChangePasswordFirstLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isMustChangePasswordFirstLogin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isMustChangePasswordFirstLogin(params?: IsMustChangePasswordFirstLogin$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.isMustChangePasswordFirstLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
  }

}
