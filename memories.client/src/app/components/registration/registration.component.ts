import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../validators';
import {AuthenticationService} from '../../services/core/authentication.service';

@Component({
  selector: 'registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  profileForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  errorserver: string = '';
  authenticationService: AuthenticationService = inject(AuthenticationService);

  constructor() { }

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
      email: this.profileForm.get('mail')?.value as string
    }).subscribe(res=> {
      this.errorserver = '';
      this.profileForm.reset();
      this.onClick.emit();
    }, error =>{
      if (error.status !== 500)
        this.errorserver = error.error;
    });
  }
}
