/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ExportClassStudentsAsPdf$Params {
  classId: number;
  isAccelerated: boolean;
  isAccredited: boolean;
}

export function exportClassStudentsAsPdf(http: HttpClient, rootUrl: string, params: ExportClassStudentsAsPdf$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
  const rb = new RequestBuilder(rootUrl, exportClassStudentsAsPdf.PATH, 'get');
  if (params) {
    rb.path('classId', params.classId, {});
    rb.query('isAccelerated', params.isAccelerated, {});
    rb.query('isAccredited', params.isAccredited, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/pdf', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<string>>;
    })
  );
}

exportClassStudentsAsPdf.PATH = '/class/{classId}/students/export';
