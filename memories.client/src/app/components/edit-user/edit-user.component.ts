import {Component, EventEmitter, inject, Inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../validators';
import {AuthenticationService} from '../../services/core/authentication.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import User from '../../../model/user';
import Role from '../../../model/role';

export interface DialogData {
  user: User,
  roles: Role[]
}

@Component({
  selector: 'edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  myForm: FormGroup;
  options: any[] = [];
  compareById(optionA: any, optionB: any): boolean {
    return optionA && optionB ? optionA.code === optionB.code : optionA === optionB;
  }
  constructor(private fb: FormBuilder) {
    let roles = this.data.roles;
    let codeRoles = this.data?.user?.codeRoles;

    console.log(roles)
    console.log(codeRoles)

    this.options = roles;

    // Установка значений по умолчанию (например, выбираем Option 1 и Option 2)
    this.myForm = this.fb.group({
      selectedOptions: [codeRoles] // Выбор по умолчанию
    });
  }

  ngOnInit(): void {
    // Любая дополнительная инициализация, если требуется
  }

  onSubmit(): void {
    const selectedValues = this.myForm.value.selectedOptions;
    console.log('Selected options:', selectedValues);
    // Здесь можете выполнить действия с выбранными значениями
  }


//   registerForm = new FormGroup({
//       login: new FormControl('', [Validators.required]),
//       mail: new FormControl('', [Validators.required, Validators.email]),
//       selectedOptions:  new FormControl([{ id: 1, name: 'Option 1' },
//         { id: 3, name: 'Option 3' }]),
//     },
//   );
//   errorserver: string = '';
//   authenticationService: AuthenticationService = inject(AuthenticationService);
//   options!: Role[];
//   constructor(private fb: FormBuilder) {
//     this.options = this.data.roles;
//     //this.options = this.data?.user?.codeRoles || [{}];
//     //console.log(this.data.user)
//     //this.registerForm.get('selectedOptions')?.setValue(this.data?.user?.codeRoles || [{}])
//     this.registerForm.get('login')?.setValue(this.data.user.login || '');
//     this.registerForm.get('mail')?.setValue(this.data.user.email || '');
//   }
//
//   get passwordMatchError() {
//     return (
//       this.registerForm.getError('mismatch') &&
//       this.registerForm.get('confirmPassword')?.touched
//     );
//   }
//
//   save(){
//     this.authenticationService.register({
//       login: this.registerForm.get('login')?.value as string,
//       email: this.registerForm.get('mail')?.value as string
//     }).subscribe(res=> {
//       this.errorserver = '';
//       this.registerForm.reset();
//       this.onClick.emit();
//     }, error =>{
//       if (error.status !== 500)
//         this.errorserver = error.error;
//     });
//   }
//
//   test(){
//    const test=  this.registerForm.get('selectedOptions')?.value;
//   console.log(test);
// }




}
