import {Component, EventEmitter, inject, Input, input, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: false,
  templateUrl: './app-link.component.html',
  styleUrl: './app-link.component.css'
})
export class AppLinkComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() user?: any;


  authenticationService: AuthenticationService = inject(AuthenticationService);
  router = inject(Router);

  logout(){
    this.router.navigate(['']);
    this.authenticationService.logout();
  }

  close(){
    this.onClick.emit();
  }
}
