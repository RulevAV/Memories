import { Injectable } from '@angular/core';
import { WrapperService } from './core/wrapper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LessonService  extends WrapperService<any> {

  constructor(protected override httpClient: HttpClient, override dialog: MatDialog) {
    super(httpClient, 'lesson', dialog);
  }
//http://localhost:5269/Lesson/GetCard?idCard=29eeafc3-f401-48bc-a5e2-08d97c0a997b&isGlobal=true
//http://localhost:5230/lesson/GetCard?idCard=29eeafc3-f401-48bc-a5e2-08d97c0a997b&isGlobal=true
  GetCard(idCard:string, isGlobal: boolean){
    const params = new HttpParams()
    .set('idCard', idCard)
    .set('isGlobal', isGlobal.toString());
    return this.Get(`GetCard`,params);
   }
  
  async users_W(idCard:string, isGlobal: boolean): Promise<any> {
      const fn = () => {
        return this.GetCard(idCard, isGlobal)
      };
      return await this.wrapper(fn) as Promise<any>;
    }
  
}
