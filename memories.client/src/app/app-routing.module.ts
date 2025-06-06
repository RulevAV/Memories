import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';
import {ProfileComponent} from './Pages/profile/profile.component';
import {UserComponent} from './Pages/Admin/user/user.component';
import {authGuard} from './auth/auth.guard';
import {AreaComponent} from './Pages/area/area.component';
import {CardsComponent} from './Pages/cards/cards.component';
import { LessonComponent } from './Pages/lesson/lesson.component';

const routes: Routes = [{ path: "", component: HomeComponent},
  { path: "admin/users", component: UserComponent, canActivate: [authGuard]},
  { path: "science", component: AreaComponent,  canActivate: [authGuard]},
  { path: "_cards/:areaId", component: CardsComponent,  canActivate: [authGuard]},
  { path: "_cards/:areaId/:idParent", component: CardsComponent,  canActivate: [authGuard]},
  { path: "profile", component: ProfileComponent,  canActivate: [authGuard]},
  { path: "_lesson/:idCard/:isGlobal", component: LessonComponent,  canActivate: [authGuard]},

  { path: "**", component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
