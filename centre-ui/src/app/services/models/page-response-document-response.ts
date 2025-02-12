/* tslint:disable */
/* eslint-disable */
import { DocumentResponse } from '../models/document-response';
export interface PageResponseDocumentResponse {
  content?: Array<DocumentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
