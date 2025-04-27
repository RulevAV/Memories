import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';
import {ProfileComponent} from './Pages/profile/profile.component';
import {UserComponent} from './Pages/Admin/user/user.component';
import {authGuard} from './auth/auth.guard';
import {AreaComponent} from './Pages/area/area.component';

const routes: Routes = [{ path: "", component: HomeComponent},
  { path: "admin/users", component: UserComponent, canActivate: [authGuard]},
  { path: "science", component: AreaComponent,  canActivate: [authGuard]},
  { path: "profile", component: ProfileComponent,  canActivate: [authGuard]},
  { path: "**", component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
