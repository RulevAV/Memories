import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {BaseService} from './base.service';
import User from '../../../model/user';
import TokenResponse from '../../../model/token-response';
import roleEnum from '../../../enum/roleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService<any> {

  accessToken$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  user!: User | null;
  user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(undefined);

  constructor(protected override httpClient: HttpClient,  override dialog: MatDialog) {
    super(httpClient, 'authenticate',dialog);
  }
  register(user: User): Observable<any[]> {
    return this.Post('register', user);
  }
  refresh(){
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || !accessToken){
      this.accessToken$.next('');
      return;
    }

    return this.Post<TokenResponse>('refresh-token', {
      accessToken,
      refreshToken
    }).pipe(map(res =>{
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken',res.refreshToken);
      this.accessToken$.next(res.accessToken);
      this.user = res.user;
      this.user$.next(this.user);
      return res;
    }));
  }
  login(user: User): Observable<TokenResponse> {
    return this.Post<TokenResponse>('login', user).pipe(map(res =>{
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken',res.refreshToken);
      this.accessToken$.next(res.accessToken);
      this.user = res.user;
      this.user$.next(this.user);
      return res;
    }));
  }
  logout(){
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '')
    this.accessToken$.next('');
    this.user = null;
    this.user$.next(this.user);
  }

  isAdmin() {
    return this.user?.codeRoles?.map(u=> u.code).includes(roleEnum.Admin);
  }
}
