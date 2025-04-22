import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {CustomValidators} from '../../../validators';

@Component({
  selector: 'registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  profileForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
    mail: new FormControl('', [Validators.required, Validators.email]),
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );

  authenticationService: AuthenticationService = inject(AuthenticationService);


  constructor() {

  }
  get passwordMatchError() {
    return (
      this.profileForm.getError('mismatch') &&
      this.profileForm.get('confirmPassword')?.touched
    );
  }

  save(){
    // let asd = this.profileForm.value;
    // console.log(asd);
    // this.authenticationService.register({
    //   login: this.profileForm.get('login')?.value as string,
    //   password: this.profileForm.get('password')?.value as string,
    //   mail: this.profileForm.get('mail')?.value as string
    // }).subscribe(res=> console.log(res));

    this.authenticationService.test().subscribe(res=> console.log(res));
  }
}
