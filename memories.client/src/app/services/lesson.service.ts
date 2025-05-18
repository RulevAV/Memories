import { Injectable } from '@angular/core';
import { WrapperService } from './core/wrapper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../model/card';
import { map, Observable } from 'rxjs';
import { LessonCard } from '../../model/lessonCard';

@Injectable({
  providedIn: 'root'
})
export class LessonService  extends WrapperService<any> {

  constructor(protected override httpClient: HttpClient, override dialog: MatDialog) {
    super(httpClient, 'lesson', dialog);
  }
  getCard(idCard:string, isGlobal: string){
    const params = new HttpParams()
    .set('idCard', idCard)
    .set('isGlobal', isGlobal.toString());
    return this.Get<LessonCard>(`GetCard`,params);
   }

  setIgnore(idLesson: string, idCard: string): Observable<any[]> {
    const params = new HttpParams()
    .set('idLesson', idLesson)
    .set('idCard', idCard);
       return this.Post("SetIgnore", null, params).pipe(map(res => {
         return res as any;
       }));
  }
  clear(idLesson: string): Observable<any[]> {
    const params = new HttpParams()
    .set('idLesson', idLesson);
       return this.Post("Clear", null, params).pipe(map(res => {
         return res as any;
       }));
  }
  

  async getCard_W(idCard:string, isGlobal: string): Promise<LessonCard> {
      const fn = () => {
        return this.getCard(idCard, isGlobal)
      };
      return await this.wrapper(fn) as Promise<LessonCard>;
    }
  async setIgnore_W(idLesson: string, idCard: string): Promise<any> {
      const fn = () => {
        return this.setIgnore(idLesson, idCard)
      };
      return await this.wrapper(fn) as Promise<any>;
    }
  async clear_W(idLesson: string): Promise<any> {
      const fn = () => {
        return this.clear(idLesson)
      };
      return await this.wrapper(fn) as Promise<any>;
    }
}
