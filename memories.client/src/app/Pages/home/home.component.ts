import {Component, inject} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/core/authentication.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userService: UserService = inject(UserService);
  authenticationService: AuthenticationService = inject(AuthenticationService);

  async infoUser(){
    this.userService.infoUser_W();
  }
  async test1(){
    this.userService.getUser_W();
  }
  async test2(){
    await this.userService.postUser_W();
  }
  async test3(){
    await this.userService.putUser_W();
  }
  async test4(){
    await this.userService.deleteUser_W();
  }

  async refresh(){
    this.authenticationService.refresh()?.subscribe();
  }
}
