import {Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import User from '../../../../model/user';
import Role from '../../../../model/role';
export interface DialogData {
  title: string,
  area: any,
  users: User[]
}
@Component({
  selector: 'app-area-edit',
  standalone: false,
  templateUrl: './area-edit.component.html',
  styleUrl: './area-edit.component.css'
})
export class AreaEditComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  options: any[] = [];

  areanForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    img: new FormControl('', ),
    selectedOptions:  new FormControl([] as any[]),
  });

  constructor(private dialogRef: MatDialogRef<AreaEditComponent>) { }
  ngOnInit(){
    this.areanForm.get('id')?.setValue(this.data.area.id);
    this.areanForm.get('name')?.setValue(this.data.area.name);
    this.areanForm.get('img')?.setValue(this.data.area.img);
    this.options = this.data.users;
    // @ts-ignore
    const accessAreas = this.data?.area?.accessAreas.map(u => u.idGuestNavigation) || [];
    this.areanForm.get('selectedOptions')?.setValue(accessAreas);
  }
  changeImg(){
    this.fileInput.nativeElement.click();
  }
  closeDialog(): void {
    this.dialogRef.close(); // Закрытие диалога
  }
  save(){
    let area = this.data.area;
    area.name = this.areanForm.get('name')?.value || '';
    area.img = this.areanForm.get('img')?.value || '';
    const guests  = (this.areanForm.get('selectedOptions')?.value || []) as User[];
    area.accessAreas = [];
    this.dialogRef.close({
      area,
      guests});
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files?.length) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        // После загрузки файла конвертируем его в base64
        this.areanForm.get('img')?.setValue(e.target?.result as string)
      };

      // Читаем файл как Data URL для получения base64 строки
      reader.readAsDataURL(file);
    }
  }

  compareById(optionA: any, optionB: any): boolean {
    return optionA && optionB ? optionA.id === optionB.id : optionA === optionB;
  }
}
