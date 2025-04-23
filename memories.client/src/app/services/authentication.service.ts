import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../model/user';
import {BaseService} from './core/base.service';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, map, Observable} from 'rxjs';
import TokenResponse from '../../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService<any> {
  user!: User | null;
  user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(undefined);

  constructor(protected override httpClient: HttpClient,  override dialog: MatDialog) {
    super(httpClient, 'authentication',dialog);
  }

  test(): Observable<any[]> {
    return this.Get("test");
  }

  register(user: User): Observable<any[]> {
    return this.Post('register', user);
  }

  refresh(){
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || !accessToken)
      return;
    return this.Post<TokenResponse>('refresh', {
      accessToken,
      refreshToken
    }).pipe(map(res =>{
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken)
      this.user = res.user;
      this.user$.next(this.user);
      return res;
    }));
  }

  login(user: User): Observable<TokenResponse> {
    return this.Post<TokenResponse>('login', user).pipe(map(res =>{
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken',res.refreshToken)
      this.user = res.user;
      this.user$.next(this.user);
      return res;
    }));
  }
  logout(){
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '')
    this.user = null;
    this.user$.next(this.user);
  }
}
