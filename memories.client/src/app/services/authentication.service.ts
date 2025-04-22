import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../model/user';
import {BaseService} from './core/base.service';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService<any> {
  user: User | null;

  constructor(protected override httpClient: HttpClient,  override dialog: MatDialog) {
    super(httpClient, 'authentication',dialog);
    this.user = null;
  }

  test(): Observable<any[]> {
    return this.Get("test");
  }

  register(user: User): Observable<any[]> {
    return this.Post('register', user);
  }
}
