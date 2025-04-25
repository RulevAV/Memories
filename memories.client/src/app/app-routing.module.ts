import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {PostComponent} from './Pages/post/post.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';
import {ProfileComponent} from './Pages/profile/profile.component';
import {UserComponent} from './Pages/Admin/user/user.component';
import {authGuard} from './auth/auth.guard';

const routes: Routes = [{ path: "", component: HomeComponent},
  { path: "admin/users", component: UserComponent, canActivate: [authGuard]},
  { path: "area", component: PostComponent,  canActivate: [authGuard]},
  { path: "profile", component: ProfileComponent,  canActivate: [authGuard]},
  { path: "**", component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
