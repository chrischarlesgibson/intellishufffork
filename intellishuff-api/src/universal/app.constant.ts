export class AppConstant {
  public static readonly ROUTE_PREFIX = 'api/v1';

  public static readonly ACCESS_TOKEN_SECRET_KEY = '123456';
  public static readonly REFRESH_TOKEN_SECRET_KEY = '123456789';

  //must be in seconds
  public static readonly DEFAULT_JWT_TOKEN_EXPIRATION = '5m'; 
  public static readonly DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION = '1d';  

  public static readonly ADMIN_EMAIL = 'dev.faisalkhan@gmail.com';
  public static readonly DEFAULT_EMAIL_USERNAME = 'dev.faisalkhan@gmail.com';
  public static readonly DEFAULT_EMAIL_PASSWORD = 'sdrurpeoszzqnyfe';
  public static readonly DEFAULT_EMAIL_SMTP = 'smtp.gmail.com';
}
