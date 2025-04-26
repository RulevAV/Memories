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
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Импорт MatOptionModule


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
    LoginComponent,
    RegistrationComponent,
    EditUserComponent,
    EditUserComponent,
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
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginator,
    FormsModule,
    MatSelectModule,
    MatOptionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
