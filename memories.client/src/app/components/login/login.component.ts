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

  loginForm = new FormGroup({
    login: new FormControl('maag',[Validators.required]),
    password: new FormControl('1', [Validators.required]),
  });

  constructor() { }


  signin(){
    this.authenticationService.login({
      login: this.loginForm.get('login')?.value as string,
      password: this.loginForm.get('password')?.value as string,
    }).subscribe(res=> {
      this.loginForm.reset();
      this.onClick.emit();
    }, error =>{

    });
  }

}
