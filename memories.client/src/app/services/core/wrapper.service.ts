import {Inject, inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {AuthenticationService} from './authentication.service';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class WrapperService<T> extends BaseService<any> {
  authenticationService: AuthenticationService = inject(AuthenticationService);
  constructor(protected override httpClient: HttpClient, @Inject(String) ControllerName: string, override dialog: MatDialog) {
    super(httpClient, ControllerName ,dialog);
  }

  async wrapper(httpservis: ()=> any){
    const refreshToken = this.authenticationService.refresh();
    let res = null;
    try {
      res = await firstValueFrom(httpservis());
    } catch (e) {
      if (refreshToken) {
        await firstValueFrom(refreshToken);
        res = await firstValueFrom(httpservis());
      }
    } finally {
    }
    return res;
  }
}
