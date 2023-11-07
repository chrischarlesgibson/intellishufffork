import { NgModule } from '@angular/core';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { AuthRoutingModule } from './modules/authentication/auth-routing.module';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './modules/authentication/auth.guard';
import { HomeComponent } from './modules/user/home/home.component';
import { UserProfileResolver } from './modules/authentication/userprofile.resolver';
import { EditProfileComponent } from './modules/authentication/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'edit-profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/authentication/edit-profile/edit-profile.module').then(
        (m) => m.EditProfileModule,
      ),
    resolve: {
      userData: UserProfileResolver,
    },
  },

  // Other routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
