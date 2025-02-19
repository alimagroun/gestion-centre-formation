/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { SchoolYearControllerService } from './services/school-year-controller.service';
import { RegistrationControllerService } from './services/registration-controller.service';
import { SpecialtyControllerService } from './services/specialty-controller.service';
import { RoleControllerService } from './services/role-controller.service';
import { PersonControllerService } from './services/person-controller.service';
import { FromationControllerService } from './services/fromation-controller.service';
import { DomaineControllerService } from './services/domaine-controller.service';
import { DocumentsControllerService } from './services/documents-controller.service';
import { ClassroomControllerService } from './services/classroom-controller.service';
import { ClasseFormationControllerService } from './services/classe-formation-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { SubjectControllerService } from './services/subject-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    SchoolYearControllerService,
    RegistrationControllerService,
    SpecialtyControllerService,
    RoleControllerService,
    PersonControllerService,
    FromationControllerService,
    DomaineControllerService,
    DocumentsControllerService,
    ClassroomControllerService,
    ClasseFormationControllerService,
    AuthenticationControllerService,
    UserControllerService,
    SubjectControllerService,
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
