/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcceleratedClassGroup } from '../../models/accelerated-class-group';

export interface FindAllAcceleratedClasses$Params {
}

export function findAllAcceleratedClasses(http: HttpClient, rootUrl: string, params?: FindAllAcceleratedClasses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcceleratedClassGroup>>> {
  const rb = new RequestBuilder(rootUrl, findAllAcceleratedClasses.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AcceleratedClassGroup>>;
    })
  );
}

findAllAcceleratedClasses.PATH = '/class/accelerated/all';
