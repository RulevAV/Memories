import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './modal/menu/menu.component';
import { AppLinkComponent } from './components/app-link/app-link.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AreaComponent } from './Pages/area/area.component';
import { AreaEditComponent } from './Pages/area/area-edit/area-edit.component';
import { CardsComponent } from './Pages/cards/cards.component';
import { CardEditComponent } from './Pages/cards/card-edit/card-edit.component';
import { LessonComponent } from './Pages/lesson/lesson.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    NavbarComponent,
    MenuComponent,
    AppLinkComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    EditUserComponent,
    EditUserComponent,
    AreaComponent,
    AreaEditComponent,
    CardsComponent,
    CardEditComponent,
    LessonComponent,
    ConfirmComponent
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
    MatOptionModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
