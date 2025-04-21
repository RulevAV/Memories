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
import { AuthenticationComponent } from './modal/authentication/authentication.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

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
    AuthenticationComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
