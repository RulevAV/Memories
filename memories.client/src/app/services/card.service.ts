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

  update(card:any): Observable<any[]> {
    return this.Post("Update", card).pipe(map(res => {
      return res as any;
    }));
  }

  cards(page: number, pageSize: number, search:string, areaId:string, idParent:string| null| undefined): Observable<User[]> {
    let item =  {
      page,
      pageSize,
      search,
      areaId
    } as any ;
    if (!!idParent)
      item.idParent = idParent;
    return this.Get<User[]>("Cards", item);
  }

  async postCard_W(card: any) {
    const fn = () => this.postCard(card);
    return await this.wrapper(fn);
  }

  async cards_W(page: number, pageSize: number,  search:string, areaId:string, idParent:string| null| undefined): Promise<PaginatorUser> {
    const fn = () => {
      return this.cards(page, pageSize, search, areaId, idParent)
    };
    return await this.wrapper(fn) as Promise<PaginatorUser>;
  }

  async postUpdate_W(card: any) {
    const fn = () => {
      return this.update(card);
    }
    return await this.wrapper(fn) as Role[];
  }
}
