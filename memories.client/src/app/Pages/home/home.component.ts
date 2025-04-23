import {Component, inject} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userService: UserService = inject(UserService);
  test1(){
    this.userService.getUser().subscribe();
  }
  async test2(){
    var asd = await this.userService.postUser2();
    console.log(asd);
  }
  test3(){
    this.userService.putUser().subscribe();
  }
  test4(){
    this.userService.deleteUser().subscribe();
  }
}
