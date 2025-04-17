import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { PostComponent } from './Pages/post/post.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './modal/menu/menu.component';
import { AppLinkComponent } from './components/app-link/app-link.component';
import { UserComponent } from './Pages/Admin/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    PostComponent,
    NotFoundComponent,
    NavbarComponent,
    MenuComponent,
    AppLinkComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
