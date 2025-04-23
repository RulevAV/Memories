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
  test1(){
    this.userService.getUser().subscribe();
  }
  async test2(){
    await this.userService.postUser_W();
  }
  test3(){
    this.userService.putUser().subscribe();
  }
  test4(){
    this.userService.deleteUser().subscribe();
  }

  refresh(){
    this.authenticationService.refresh()?.subscribe();
  }
}
