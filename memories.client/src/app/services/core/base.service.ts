import {Inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends any> {
  private readonly controllerName: string;
  env = environment;

  constructor(protected httpClient: HttpClient, @Inject(String) ControllerName: string, public dialog: MatDialog,) {
    this.controllerName = `${this.env.baseUrl}/${ControllerName}`;
  }

  protected static readonly EMPTY = '';

  /*User*/
  protected static readonly GET_USER = 'GetUser';

  protected Get<R>(url: string, params?:  HttpParams) {
    return this.httpClient.get<R>(`${this.controllerName}/${url}`, { params: params })
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
    return this.httpClient.post<A>(`${this.controllerName}/${url}`, body, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
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
    return this.httpClient.put<A>(`${this.controllerName}/${url}`, body, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
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
    return this.httpClient.delete<A>(`${this.controllerName}/${url}`, { withCredentials: true })
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
