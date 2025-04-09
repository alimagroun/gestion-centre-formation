export interface Menu {
  id?: string;
  titre?: string;
  icon?: string;
  url?: string;
  activate?: boolean;
  sousMenu?: Array<Menu>;
}
