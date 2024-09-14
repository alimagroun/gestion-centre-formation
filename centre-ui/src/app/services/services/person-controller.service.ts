/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { emailValidation } from '../fn/person-controller/email-validation';
import { EmailValidation$Params } from '../fn/person-controller/email-validation';
import { findParentByNum } from '../fn/person-controller/find-parent-by-num';
import { FindParentByNum$Params } from '../fn/person-controller/find-parent-by-num';
import { ParentResponse } from '../models/parent-response';
import { phoneNumberValidation } from '../fn/person-controller/phone-number-validation';
import { PhoneNumberValidation$Params } from '../fn/person-controller/phone-number-validation';

@Injectable({ providedIn: 'root' })
export class PersonControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `phoneNumberValidation()` */
  static readonly PhoneNumberValidationPath = '/person/validation/phone-number';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `phoneNumberValidation()` instead.
   *
   * This method doesn't expect any request body.
   */
  phoneNumberValidation$Response(params: PhoneNumberValidation$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return phoneNumberValidation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `phoneNumberValidation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  phoneNumberValidation(params: PhoneNumberValidation$Params, context?: HttpContext): Observable<boolean> {
    return this.phoneNumberValidation$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `emailValidation()` */
  static readonly EmailValidationPath = '/person/validation/email';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `emailValidation()` instead.
   *
   * This method doesn't expect any request body.
   */
  emailValidation$Response(params: EmailValidation$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return emailValidation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `emailValidation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  emailValidation(params: EmailValidation$Params, context?: HttpContext): Observable<boolean> {
    return this.emailValidation$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
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
