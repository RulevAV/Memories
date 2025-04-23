import { Injectable } from '@angular/core';
import {BaseService} from './core/base.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any> {
  constructor(protected override httpClient: HttpClient,  override dialog: MatDialog) {
    super(httpClient, 'user',dialog);
  }

  // getUser(){
  //   this.httpClient.get<any>('https://localhost:52303/User/Get').subscribe(
  //     (result) => {
  //       console.log(result);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  getUser(): Observable<any[]> {
    return this.Get("GetUser");
  }

  postUser(): Observable<any[]> {
    return this.Post("PostUser", null);
  }

  putUser(): Observable<any[]> {
    return this.Put("PutUser", null);
  }

  deleteUser(): Observable<any[]> {
    return this.Delete("DeleteUser");
  }

}
