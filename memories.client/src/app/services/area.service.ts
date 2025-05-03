import { Injectable } from '@angular/core';
import {WrapperService} from './core/wrapper.service';
import User, {PaginatorUser} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, map, Observable} from 'rxjs';
import Area from '../../model/area';
import Role from '../../model/role';

@Injectable({
  providedIn: 'root'
})
export class AreaService  extends WrapperService<User> {

  constructor(protected override httpClient: HttpClient, override dialog: MatDialog) {
    super(httpClient, 'scienceArea', dialog);
  }


  postArea(file: any, name: any, accessAreas: any): Observable<any> {
    const formData: FormData = new FormData();
    if (!!file) {
      formData.append('File', file, file?.name); 
    }
    formData.append('Id', '00000000-0000-0000-0000-000000000000'); 
    formData.append('Name', name); 

    if (accessAreas && accessAreas.length > 0) {
      accessAreas.forEach((area: any) => {
        formData.append('AccessAreas', area);
      });
    }

    const authToken = localStorage.getItem('accessToken'); // Замените 'authToken' на ключ, под которым вы храните токен

    const headers = {
      'Authorization': `Bearer ${authToken}` // Добавляем заголовок авторизации
    };

    // Отправляем POST-запрос с FormData и заголовками
    return this.httpClient.post<string>(`${this.controllerName}/CreateArea`, formData, { headers: headers });
  }

  update( id: string, file: any, name: any, accessAreas: any): Observable<any> {
    const formData: FormData = new FormData();
    if (!!file) {
      formData.append('File', file, file?.name); 
    }
    formData.append('Id', id); 
    formData.append('Name', name); 

    if (accessAreas && accessAreas.length > 0) {
      accessAreas.forEach((area: any) => {
        formData.append('AccessAreas', area);
      });
    }
    console.log(formData);
    
    const authToken = localStorage.getItem('accessToken'); // Замените 'authToken' на ключ, под которым вы храните токен

    const headers = {
      'Authorization': `Bearer ${authToken}` // Добавляем заголовок авторизации
    };

    // Отправляем POST-запрос с FormData и заголовками
    return this.httpClient.post<string>(`${this.controllerName}/Update`, formData, { headers: headers });
  }

  areas(page: number, pageSize: number, name:string, idGuest:string|number): Observable<User[]> {
    return this.Get<User[]>("Areas", {
      page,
      pageSize,
      name,
      idGuest
    } as any);
  }

  async postArea_W(file: any, name: any, accessAreas: any) {
    const fn = () => this.postArea(file, name, accessAreas);
    return await this.wrapper(fn);
  }

  async areas_W(page: number, pageSize: number,  name:string, idGuest:string| number): Promise<PaginatorUser> {
    const fn = () => {
      return this.areas(page, pageSize, name, idGuest)
    };
    return await this.wrapper(fn) as Promise<PaginatorUser>;
  }

  async postUpdate_W(id: string, file: any, name: any, accessAreas: any) {
    const fn = () => {
      return this.update(id, file, name, accessAreas);
    }
    return await this.wrapper(fn) as Role[];
  }
}
