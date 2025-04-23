import {Component, EventEmitter, inject, Input, input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/core/authentication.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-link',
  standalone: false,
  templateUrl: './app-link.component.html',
  styleUrl: './app-link.component.css'
})
export class AppLinkComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() user?: any;

  userService: UserService = inject(UserService);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  router = inject(Router);

  logout(){
    this.router.navigate(['']);
    this.authenticationService.logout();
    this.close();
  }

  close(){
    this.onClick.emit();
  }
}
