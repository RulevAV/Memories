import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/core/authentication.service';

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  authenticationService: AuthenticationService = inject(AuthenticationService);

  profileForm = new FormGroup({
    login: new FormControl('maag',[Validators.required]),
    password: new FormControl('1', [Validators.required]),
  });

  constructor() { }


  signin(){
    this.authenticationService.login({
      login: this.profileForm.get('login')?.value as string,
      password: this.profileForm.get('password')?.value as string,
    }).subscribe(res=> {
      this.profileForm.reset();
      this.onClick.emit();
    }, error =>{

    });
  }

}
