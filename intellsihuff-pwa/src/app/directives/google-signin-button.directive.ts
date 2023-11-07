import { Directive, ElementRef, NgZone } from '@angular/core';

@Directive({
  selector: '[google-signin-button]'
})
export class GoogleSigninButtonDirective {

  constructor(private el: ElementRef, private ngZone: NgZone) {}
  
  ngOnInit() {
    this.loadGoogleSignInScript();
  }

  loadGoogleSignInScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.ngZone.run(() => this.renderSignInButton());
    };
    document.head.appendChild(script);
  }

  renderSignInButton() {
    // Customize your Google Sign-In button here based on the provided HTML.
    // You can use this.el.nativeElement to manipulate the DOM.
    // Ensure you replace the following code with your custom implementation.

    const div = document.createElement('div');
    div.className = 'g_id_signin';
    div.setAttribute('data-type', 'standard');
    div.setAttribute('data-shape', 'rectangular');
    div.setAttribute('data-theme', 'outline');
    div.setAttribute('data-text', 'signin_with');
    div.setAttribute('data-size', 'large');
    div.setAttribute('data-logo_alignment', 'left');
    div.setAttribute('data-width', '310');

    this.el.nativeElement.appendChild(div);

    // Handle click event on the button and trigger Google Sign-In accordingly.
    div.addEventListener('click', () => {
      // Implement your Google Sign-In logic here.
      // For example, you can use the gapi.auth2.init and gapi.auth2.getAuthInstance methods.
    });
  }
}