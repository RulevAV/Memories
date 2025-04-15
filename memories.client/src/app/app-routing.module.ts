import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {PostComponent} from './Pages/post/post.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';
import {ProfileComponent} from './Pages/profile/profile.component';

const routes: Routes = [{ path: "", component: HomeComponent},
  { path: "post", component: PostComponent},
  { path: "profile", component: ProfileComponent},
  { path: "**", component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
