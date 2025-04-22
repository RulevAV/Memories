import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {CustomValidators} from '../../../validators';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  profileForm = new FormGroup({
    login: new FormControl('maag', [Validators.required]),
    password: new FormControl('1', [Validators.required]),
    confirmPassword: new FormControl('1'),
    mail: new FormControl('rulandrei99@mail.ru', [Validators.required, Validators.email]),
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  errorserver: string = '';
  authenticationService: AuthenticationService = inject(AuthenticationService);

  constructor(private _dialog: MatDialog) { }

  get passwordMatchError() {
    return (
      this.profileForm.getError('mismatch') &&
      this.profileForm.get('confirmPassword')?.touched
    );
  }

  save(){
    this.authenticationService.register({
      login: this.profileForm.get('login')?.value as string,
      password: this.profileForm.get('password')?.value as string,
      mail: this.profileForm.get('mail')?.value as string
    }).subscribe(res=> {
      this.errorserver = '';
      this.profileForm.reset();
      this._dialog.closeAll();
    }, error =>{
        this.errorserver = error.error;
    });

    this.authenticationService.test().subscribe(res=> console.log(res));
  }
}
