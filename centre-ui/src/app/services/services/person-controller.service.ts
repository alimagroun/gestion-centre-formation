/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addTeacher } from '../fn/person-controller/add-teacher';
import { AddTeacher$Params } from '../fn/person-controller/add-teacher';
import { ApiResponseObject } from '../models/api-response-object';
import { emailValidation } from '../fn/person-controller/email-validation';
import { EmailValidation$Params } from '../fn/person-controller/email-validation';
import { findAllParentsPaged } from '../fn/person-controller/find-all-parents-paged';
import { FindAllParentsPaged$Params } from '../fn/person-controller/find-all-parents-paged';
import { findAllStudentsByParentId } from '../fn/person-controller/find-all-students-by-parent-id';
import { FindAllStudentsByParentId$Params } from '../fn/person-controller/find-all-students-by-parent-id';
import { findAllStudentsPaged } from '../fn/person-controller/find-all-students-paged';
import { FindAllStudentsPaged$Params } from '../fn/person-controller/find-all-students-paged';
import { findAllTeachersPaged } from '../fn/person-controller/find-all-teachers-paged';
import { FindAllTeachersPaged$Params } from '../fn/person-controller/find-all-teachers-paged';
import { findParentByNum } from '../fn/person-controller/find-parent-by-num';
import { FindParentByNum$Params } from '../fn/person-controller/find-parent-by-num';
import { findParentDetailById } from '../fn/person-controller/find-parent-detail-by-id';
import { FindParentDetailById$Params } from '../fn/person-controller/find-parent-detail-by-id';
import { findStudentById } from '../fn/person-controller/find-student-by-id';
import { FindStudentById$Params } from '../fn/person-controller/find-student-by-id';
import { getAllStudents } from '../fn/person-controller/get-all-students';
import { GetAllStudents$Params } from '../fn/person-controller/get-all-students';
import { getStudentInfo } from '../fn/person-controller/get-student-info';
import { GetStudentInfo$Params } from '../fn/person-controller/get-student-info';
import { identityNumberValidation } from '../fn/person-controller/identity-number-validation';
import { IdentityNumberValidation$Params } from '../fn/person-controller/identity-number-validation';
import { PageResponseParentResponse } from '../models/page-response-parent-response';
import { PageResponseStudentResponse } from '../models/page-response-student-response';
import { PageResponseTeacherResponse } from '../models/page-response-teacher-response';
import { ParentDetailResponse } from '../models/parent-detail-response';
import { ParentResponse } from '../models/parent-response';
import { phoneNumberValidation } from '../fn/person-controller/phone-number-validation';
import { PhoneNumberValidation$Params } from '../fn/person-controller/phone-number-validation';
import { StudentAllResponse } from '../models/student-all-response';
import { StudentDetailsResponse } from '../models/student-details-response';
import { StudentResponse } from '../models/student-response';

@Injectable({ providedIn: 'root' })
export class PersonControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllTeachersPaged()` */
  static readonly FindAllTeachersPagedPath = '/person/teacher';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllTeachersPaged()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllTeachersPaged$Response(params?: FindAllTeachersPaged$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTeacherResponse>> {
    return findAllTeachersPaged(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllTeachersPaged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllTeachersPaged(params?: FindAllTeachersPaged$Params, context?: HttpContext): Observable<PageResponseTeacherResponse> {
    return this.findAllTeachersPaged$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseTeacherResponse>): PageResponseTeacherResponse => r.body)
    );
  }

  /** Path part for operation `addTeacher()` */
  static readonly AddTeacherPath = '/person/teacher';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTeacher()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTeacher$Response(params: AddTeacher$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseObject>> {
    return addTeacher(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTeacher$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTeacher(params: AddTeacher$Params, context?: HttpContext): Observable<ApiResponseObject> {
    return this.addTeacher$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponseObject>): ApiResponseObject => r.body)
    );
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

  /** Path part for operation `identityNumberValidation()` */
  static readonly IdentityNumberValidationPath = '/person/validation/identity-number';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `identityNumberValidation()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityNumberValidation$Response(params: IdentityNumberValidation$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return identityNumberValidation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `identityNumberValidation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityNumberValidation(params: IdentityNumberValidation$Params, context?: HttpContext): Observable<boolean> {
    return this.identityNumberValidation$Response(params, context).pipe(
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

  /** Path part for operation `findStudentById()` */
  static readonly FindStudentByIdPath = '/person/student/{studentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findStudentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findStudentById$Response(params: FindStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentDetailsResponse>> {
    return findStudentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findStudentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findStudentById(params: FindStudentById$Params, context?: HttpContext): Observable<StudentDetailsResponse> {
    return this.findStudentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentDetailsResponse>): StudentDetailsResponse => r.body)
    );
  }

  /** Path part for operation `getStudentInfo()` */
  static readonly GetStudentInfoPath = '/person/student/info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentInfo$Response(params?: GetStudentInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentDetailsResponse>> {
    return getStudentInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentInfo(params?: GetStudentInfo$Params, context?: HttpContext): Observable<StudentDetailsResponse> {
    return this.getStudentInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentDetailsResponse>): StudentDetailsResponse => r.body)
    );
  }

  /** Path part for operation `getAllStudents()` */
  static readonly GetAllStudentsPath = '/person/student/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStudents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStudents$Response(params?: GetAllStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentAllResponse>>> {
    return getAllStudents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStudents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStudents(params?: GetAllStudents$Params, context?: HttpContext): Observable<Array<StudentAllResponse>> {
    return this.getAllStudents$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StudentAllResponse>>): Array<StudentAllResponse> => r.body)
    );
  }

  /** Path part for operation `findAllStudentsPaged()` */
  static readonly FindAllStudentsPagedPath = '/person/person/student';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllStudentsPaged()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentsPaged$Response(params?: FindAllStudentsPaged$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStudentResponse>> {
    return findAllStudentsPaged(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllStudentsPaged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentsPaged(params?: FindAllStudentsPaged$Params, context?: HttpContext): Observable<PageResponseStudentResponse> {
    return this.findAllStudentsPaged$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseStudentResponse>): PageResponseStudentResponse => r.body)
    );
  }

  /** Path part for operation `findParentDetailById()` */
  static readonly FindParentDetailByIdPath = '/person/parent/{parentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findParentDetailById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findParentDetailById$Response(params: FindParentDetailById$Params, context?: HttpContext): Observable<StrictHttpResponse<ParentDetailResponse>> {
    return findParentDetailById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findParentDetailById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findParentDetailById(params: FindParentDetailById$Params, context?: HttpContext): Observable<ParentDetailResponse> {
    return this.findParentDetailById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ParentDetailResponse>): ParentDetailResponse => r.body)
    );
  }

  /** Path part for operation `findAllStudentsByParentId()` */
  static readonly FindAllStudentsByParentIdPath = '/person/parent/{parentId}/students';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllStudentsByParentId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentsByParentId$Response(params: FindAllStudentsByParentId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentResponse>>> {
    return findAllStudentsByParentId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllStudentsByParentId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStudentsByParentId(params: FindAllStudentsByParentId$Params, context?: HttpContext): Observable<Array<StudentResponse>> {
    return this.findAllStudentsByParentId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StudentResponse>>): Array<StudentResponse> => r.body)
    );
  }

  /** Path part for operation `findAllParentsPaged()` */
  static readonly FindAllParentsPagedPath = '/person/parent/findAllParentsPaged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllParentsPaged()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllParentsPaged$Response(params?: FindAllParentsPaged$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseParentResponse>> {
    return findAllParentsPaged(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllParentsPaged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllParentsPaged(params?: FindAllParentsPaged$Params, context?: HttpContext): Observable<PageResponseParentResponse> {
    return this.findAllParentsPaged$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseParentResponse>): PageResponseParentResponse => r.body)
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
