export interface IResponse<T> {
  data?: T;
  status?: any;
  message?: any;
  access_token?: string;
  refresh_token?: string;
}
