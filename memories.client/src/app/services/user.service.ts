import {inject, Injectable} from '@angular/core';
import {BaseService} from './core/base.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {firstValueFrom, map, Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any> {
  authenticationService: AuthenticationService = inject(AuthenticationService);
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
    return this.Post("PostUser", null).pipe(map(res=>{
      return res as any;
      // return res as any;
    }));
  }

async postUser2() {
    var asd= '_' as any;
    const refreshToken = this.authenticationService.refresh() ;
    try {
      console.log(1);
      asd =  await firstValueFrom(this.getUser());
    } catch (e) {
      if (refreshToken) {
        const asd2 =  await firstValueFrom(refreshToken);
        console.log(asd2);
      }

      console.log(2);
    } finally {
      console.log(3);
    }
   return asd;
  }

  putUser(): Observable<any[]> {
    return this.Put("PutUser", null).pipe(map(res=>{
      console.log(1)
      return res as any;
    }));
  }

  deleteUser(): Observable<any[]> {
    return this.Delete("DeleteUser");
  }

}
