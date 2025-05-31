import { Injectable } from '@angular/core';
import { WrapperService } from './core/wrapper.service';
import User, { PaginatorUser } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import Role from '../../model/role';
import { Card } from '../../model/card';
import { PaginatorEntity } from '../../model/paginator-entity';

@Injectable({
  providedIn: 'root'
})
export class CardService extends WrapperService<Card> {

  constructor(protected override httpClient: HttpClient, override dialog: MatDialog) {
    super(httpClient, 'card', dialog);
  }

  postCard(file: any, IdArea: any, Title: any, Content: any, IdParent: any): Observable<string> {
    const formData: FormData = new FormData();
    if (!!file) {
      formData.append('File', file, file?.name);
    }
    formData.append('Id', '00000000-0000-0000-0000-000000000000');
    formData.append('IdArea', IdArea);
    formData.append('Title', Title);
    formData.append('Content', Content);
    if (!!IdParent) {
      formData.append('IdParent', IdParent);
    }
    const authToken = localStorage.getItem('accessToken'); // Замените 'authToken' на ключ, под которым вы храните токен
    const headers = {
      'Authorization': `Bearer ${authToken}` // Добавляем заголовок авторизации
    };
    return this.httpClient.post<string>(`${this.controllerName}/Create`, formData, { headers: headers });
  }

  update(id: string, file: any, IdArea: any, Title: any, Content: any, IdParent: any): Observable<string> {
    const formData: FormData = new FormData();
    if (!!file) {
      formData.append('File', file, file?.name);
    }
    formData.append('Id', id);
    formData.append('IdArea', IdArea);
    formData.append('Title', Title);
    formData.append('Content', Content);
    if (!!IdParent) {
      formData.append('IdParent', IdParent);
    }


    const authToken = localStorage.getItem('accessToken'); // Замените 'authToken' на ключ, под которым вы храните токен

    const headers = {
      'Authorization': `Bearer ${authToken}` // Добавляем заголовок авторизации
    };

    return this.httpClient.post<string>(`${this.controllerName}/Update`, formData, { headers: headers });
  }

  cards(page: number, pageSize: number, search: string, areaId: string, idParent: string | null | undefined): Observable<PaginatorEntity<Card>> {
    let item = {
      page,
      pageSize,
      search,
      areaId
    } as any;
    if (!!idParent)
      item.idParent = idParent;
    return this.Get<PaginatorEntity<Card>>("Cards", item);
  }

  delete(id: string): Observable<string> {
    const authToken = localStorage.getItem('accessToken'); // Замените 'authToken' на ключ, под которым вы храните токен

    const headers = {
      'Authorization': `Bearer ${authToken}` // Добавляем заголовок авторизации
    };

    return this.httpClient.delete<string>(`${this.controllerName}/Delete/${id}`, { headers: headers });
  }

  updateIgnoreUserCard(id: string): Observable<string> {
    const authToken = localStorage.getItem('accessToken'); // Замените 'authToken' на ключ, под которым вы храните токен

    const headers = {
      'Authorization': `Bearer ${authToken}` // Добавляем заголовок авторизации
    };

    return this.httpClient.post<string>(`${this.controllerName}/SetIgnoreUserCard/${id}`, null, { headers: headers });
  }





  async postCard_W(file: any, IdArea: any, Title: any, Content: any, IdParent: any) {
    const fn = () => this.postCard(file, IdArea, Title, Content, IdParent);
    return await this.wrapper(fn);
  }

  async cards_W(page: number, pageSize: number, search: string, areaId: string, idParent: string | null | undefined): Promise<PaginatorEntity<Card>> {
    const fn = () => {
      return this.cards(page, pageSize, search, areaId, idParent)
    };
    return await this.wrapper(fn) as Promise<PaginatorEntity<Card>>;
  }

  async postUpdate_W(id: string, file: any, IdArea: any, Title: any, Content: any, IdParent: any) {
    const fn = () => {
      return this.update(id, file, IdArea, Title, Content, IdParent);
    }
    return await this.wrapper(fn) as Role[];
  }

  async delete_W(id: string) {
    const fn = () => {
      return this.delete(id);
    }
    return await this.wrapper(fn);
  }

  async updateIgnoreUserCard_W(id: string) {
    const fn = () => {
      return this.updateIgnoreUserCard(id);
    }
    return await this.wrapper(fn);
  }
}
