import {Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogData} from '../../area/area-edit/area-edit.component';

@Component({
  selector: 'app-card-edit',
  standalone: false,
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class CardEditComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  areanForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    content: new FormControl('',[Validators.required]),
    img: new FormControl('', ),
  });

  constructor(private dialogRef: MatDialogRef<CardEditComponent>) { }
  ngOnInit(){
    this.areanForm.get('id')?.setValue(this.data.area.id);
    this.areanForm.get('name')?.setValue(this.data.area.name);
    this.areanForm.get('img')?.setValue(this.data.area.img);
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
    area.accessAreas = [];
    this.dialogRef.close({
      area});
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

}
