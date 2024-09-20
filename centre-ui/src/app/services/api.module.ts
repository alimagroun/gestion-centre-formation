/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { SchoolYearControllerService } from './services/school-year-controller.service';
import { SpecialtyControllerService } from './services/specialty-controller.service';
import { RoleControllerService } from './services/role-controller.service';
import { RegistrationControllerService } from './services/registration-controller.service';
import { FormationControllerService } from './services/formation-controller.service';
import { DomainControllerService } from './services/domain-controller.service';
import { DocumentsControllerService } from './services/documents-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { SubjectControllerService } from './services/subject-controller.service';
import { PersonControllerService } from './services/person-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    SchoolYearControllerService,
    SpecialtyControllerService,
    RoleControllerService,
    RegistrationControllerService,
    FormationControllerService,
    DomainControllerService,
    DocumentsControllerService,
    AuthenticationControllerService,
    UserControllerService,
    SubjectControllerService,
    PersonControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
