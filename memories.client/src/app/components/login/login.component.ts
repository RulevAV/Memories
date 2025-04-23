import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authenticationService: AuthenticationService = inject(AuthenticationService);

  profileForm = new FormGroup({
    login: new FormControl('maag',[Validators.required]),
    password: new FormControl('1', [Validators.required]),
  });

  constructor(private _dialog: MatDialog) { }


  signin(){
    this.authenticationService.login({
      login: this.profileForm.get('login')?.value as string,
      password: this.profileForm.get('password')?.value as string,
    }).subscribe(res=> {
      this.profileForm.reset();
      this._dialog.closeAll();
    }, error =>{

    });
  }

}
