import { Injectable } from '@angular/core';
import {WrapperService} from './core/wrapper.service';
import User, {PaginatorUser} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {map, Observable} from 'rxjs';
import Role from '../../model/role';

@Injectable({
  providedIn: 'root'
})
  export class CardService  extends WrapperService<User> {

  constructor(protected override httpClient: HttpClient, override dialog: MatDialog) {
    super(httpClient, 'card', dialog);
  }
  infoUser() {
    this.Get('InfoUser').subscribe(data => {
      console.log(data);
    });
  }
  test(){
   return this.Get('InfoUser');
  }
  postCard(card: any): Observable<any[]> {
    return this.Post("Create", card).pipe(map(res => {
      return res as any;
    }));
  }

  update(area:any): Observable<any[]> {
    return this.Post("Update", area).pipe(map(res => {
      return res as any;
    }));
  }

  areas(page: number, pageSize: number, name:string, idGuest:string|number): Observable<User[]> {
    return this.Get<User[]>("Areas", {
      page,
      pageSize,
      name,
      idGuest
    } as any);
  }

  async postCard_W(card: any) {
    const fn = () => this.postCard(card);
    return await this.wrapper(fn);
  }

  async areas_W(page: number, pageSize: number,  name:string, idGuest:string| number): Promise<PaginatorUser> {
    const fn = () => {
      return this.areas(page, pageSize, name, idGuest)
    };
    return await this.wrapper(fn) as Promise<PaginatorUser>;
  }

  async postUpdate_W(area: any) {
    const fn = () => {
      return this.update(area);
    }
    return await this.wrapper(fn) as Role[];
  }
}
