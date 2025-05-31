import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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

    registerForm = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      selectedOptions:  new FormControl([] as Role[]),
    },
  );
  options: any[] = [];
  compareById(optionA: any, optionB: any): boolean {
    return optionA && optionB ? optionA.code === optionB.code : optionA === optionB;
  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditUserComponent>) {
    let roles = this.data.roles;
    let codeRoles = this.data?.user?.codeRoles || [];
    let email = this.data?.user.email || '';
    this.options = roles;

    this.registerForm.get('selectedOptions')?.setValue(codeRoles);
    this.registerForm.get('mail')?.setValue(email);

  }

  closeDialog(): void {
    this.dialogRef.close(); // Закрытие диалога
  }
 async save(){
   let user = this.data.user;
   user.email = this.registerForm.get('mail')?.value || '';
   const codeRoles = this.registerForm.get('selectedOptions')?.value || [];
   user.codeRoles = codeRoles.map(r => Role.generate(r));
   this.dialogRef.close(user);
  }
}
