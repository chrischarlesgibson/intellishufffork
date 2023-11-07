export class UserConstant {
  public static readonly ENCRYPTION_KEY = 'key:currentUser';

  public static readonly KEY_CURRENT_USER = 'key:currentUser';
  public static readonly KEY_CURRENT_USER_PASSWORD = 'key:currentUserPassword';
  public static readonly KEY_LOGGEDIN_METHOD = 'key:loggedInMethod';
  public static readonly KEY_FINGERPRINT_ENABLED = 'key:fingerprintEnabled';
  public static readonly KEY_ACCESS_TOKEN = 'key:accessToken';
  public static readonly KEY_REFRESH_TOKEN = 'key:refreshToken';

  public static readonly FACEBOOK_APP_ID = '645191637430374';
  public static readonly GOOGLE_SIGNIN_CLIENT_ID =
    '833763583936-ua7mksfec28qot9hptkkpk12eq7r81ab.apps.googleusercontent.com';

  public static readonly EVENT_USER_LOGGEDIN = 'event:userLoggedIn';
  public static readonly EVENT_USER_LOGGEDIN_CLICKED =
    'event:userLoggedInClicked';
  public static readonly EVENT_USER_LOGGEDOUT = 'event:userLoggedOut';
  public static readonly EVENT_USER_FORGOT_PASSWORD =
    'event:userForgotPassword';
  public static readonly EVENT_USER_RESET_PASSWORD = 'event:userResetPassword';
  public static readonly EVENT_USER_PROFILE_UPDATED =
    'event:userProfileUpdated';
  public static readonly EVENT_USER_DISPLAY_AUTH_MODAL =
    'event:displayAuthModal';
}
