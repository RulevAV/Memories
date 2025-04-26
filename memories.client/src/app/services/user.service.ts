import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {WrapperService} from './core/wrapper.service';
import User, {PaginatorUser} from '../../model/user';
import Role from '../../model/role';

@Injectable({
  providedIn: 'root'
})
export class UserService extends WrapperService<User> {

  constructor(protected override httpClient: HttpClient, override dialog: MatDialog) {
    super(httpClient, 'user', dialog);
  }

  user!: User | null;
  user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(undefined);

  infoUser(): Observable<User> {
    return this.Get<User>("infoUser")
      .pipe(map(u => {
        this.user$.next(u);
        this.user = u;
        return u;
      }));
  }

  getUser(): Observable<any[]> {
    return this.Get("GetUser");
  }

  postUser(): Observable<any[]> {
    return this.Post("PostUser", null).pipe(map(res => {
      return res as any;
    }));
  }

  putUser(): Observable<any[]> {
    return this.Put("PutUser", null);
  }

  deleteUser(): Observable<any[]> {
    return this.Delete("DeleteUser");
  }

  users(page: number, pageSize: number, login:string, email:string, codeRole:string|number): Observable<User[]> {
    return this.Get<User[]>("Users", {
      page,
      pageSize,
      login, email, codeRole
    } as any);
  }

  getUserRoles(){
    return this.Get<Role[]>("Roles");
  }

  async infoUser_W() {
    const fn = () => this.infoUser();
    return await this.wrapper(fn);
  }

  async getUser_W() {
    const fn = () => this.getUser();
    return await this.wrapper(fn);
  }

  async postUser_W() {
    const fn = () => this.postUser();
    return await this.wrapper(fn);
  }

  async putUser_W() {
    const fn = () => this.putUser();
    return await this.wrapper(fn);
  }

  async deleteUser_W() {
    const fn = () => this.deleteUser();
    return await this.wrapper(fn);
  }
  async users_W(page: number, pageSize: number,  login:string, email:string, codeRole:string| number): Promise<PaginatorUser> {
    const fn = () => {
      return this.users(page, pageSize, login, email, codeRole)
    };
    return await this.wrapper(fn) as Promise<PaginatorUser>;
  }

  async getUserRoles_W() {
    const fn = () => this.getUserRoles()
    return await this.wrapper(fn) as Role[];
  }

}
