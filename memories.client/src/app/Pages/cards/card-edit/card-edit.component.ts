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

  cardForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',),//[Validators.required]),
    content: new FormControl('',),//[Validators.required]),
    img: new FormControl('', ),
  });

  constructor(private dialogRef: MatDialogRef<CardEditComponent>) { }
  ngOnInit(){
    // this.cardForm.get('id')?.setValue(this.data.area.id);
    // this.cardForm.get('name')?.setValue(this.data.area.name);
    // this.cardForm.get('img')?.setValue(this.data.area.img);
  }
  changeImg(){
    this.fileInput.nativeElement.click();
  }
  closeDialog(): void {
    this.dialogRef.close(); // Закрытие диалога
  }
  save(){
    let card = this.data.area || {};
    card.title = this.cardForm.get('title')?.value || '';
    card.content = this.cardForm.get('content')?.value || '';
    card.img = this.cardForm.get('img')?.value || '';
    this.dialogRef.close(card);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files?.length) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        // После загрузки файла конвертируем его в base64
        this.cardForm.get('img')?.setValue(e.target?.result as string)
      };

      // Читаем файл как Data URL для получения base64 строки
      reader.readAsDataURL(file);
    }
  }

}
