export interface IResponse<T> {
  data?: T;
  status?: any;
  message?: any;
  access_token?: string;
}

export enum SweetAlertIcon {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}
