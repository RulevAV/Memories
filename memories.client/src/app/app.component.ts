import {Component, inject, OnInit} from '@angular/core';
import {AuthenticationService} from './services/core/authentication.service';
import User from '../model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user! : User | undefined | null
  constructor() {}
  authenticationService: AuthenticationService = inject(AuthenticationService);
  ngOnInit() {
    this.authenticationService.refresh()?.subscribe();
    this.authenticationService.user$.subscribe(user => {
      if (user){
        this.user = user;
      } else {
        this.user= null;
      }
    })
  }
}
