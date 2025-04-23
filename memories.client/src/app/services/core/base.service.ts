import {Inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  private readonly controllerName: string;
  env = environment;

  constructor(protected httpClient: HttpClient, @Inject(String) ControllerName: string, public dialog: MatDialog,) {
    this.controllerName = `${this.env.baseUrl}/${ControllerName}`;
  }

  protected static readonly EMPTY = '';

  /*User*/
  protected static readonly GET_USER = 'GetUser';

  protected Get<R>(url: string, params?:  HttpParams) {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    return this.httpClient.get<R>(`${this.controllerName}/${url}`, { params, headers })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          createModalError(this.dialog,err)
          return throwError(err);
        }));
  }
  protected Post<A>(url: string, body: T) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'content-type': 'application/json'
    }

    return this.httpClient.post<A>(`${this.controllerName}/${url}`, body, { headers })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          createModalError(this.dialog,err)
          return throwError(err);
        }));
  }
  protected Put<A>(url: string, body: T) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'content-type': 'application/json'
    }
    return this.httpClient.put<A>(`${this.controllerName}/${url}`, body, { headers })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          createModalError(this.dialog,err)
          return throwError(err);
        }));
  }
  protected Delete<A>(url: string) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
    return this.httpClient.delete<A>(`${this.controllerName}/${url}`, { withCredentials: true, headers })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(req => {
          createModalError(this.dialog,req)
          return throwError(req);
        }))
  }

  convertMessage(message: string){
    return `"${message.replaceAll('\\','\\\\').replaceAll('"','\\"')}"`;
  }
}

const createModalError = (dialog: MatDialog, req: any) => {
  // let dialogRef =  dialog.open(ErrorComponent,{
  //   data: {
  //     type: 'StructureUnit',
  //     title: 'Примечание',
  //     info:{nameInput: 'Примечание'},
  //     req:req
  //   },
  //   width: '500px',
  // });
}
