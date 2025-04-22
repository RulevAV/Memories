import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User | null;
  constructor(private http: HttpClient){
    this.user = null;
  }

  register(user: User){
    console.log(user)
    return this.http.post("https://localhost:7264/postuser", user);
  }
  test(){
    return this.http.get("https://localhost:7264/WeatherForecast/Get");
  }
}
