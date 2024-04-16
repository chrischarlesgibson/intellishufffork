import { Component } from "@angular/core";

@Component({
    selector: 'google-signin-button',
    template: `
<div id="g_id_onload"
     data-client_id="833763583936-ua7mksfec28qot9hptkkpk12eq7r81ab.apps.googleusercontent.com"
     data-context="use"
     data-ux_mode="popup"
     data-login_uri="http://localhost:3000/api/v1/user/googleAuth"
     data-auto_select="true"
     data-itp_support="true">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left"
     data-width="310">
</div>
    `
})
export class GoogleSigninButtonComponent {

}