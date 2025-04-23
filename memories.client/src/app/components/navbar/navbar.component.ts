import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from '../../modal/menu/menu.component';
import {AuthenticationComponent} from '../../modal/authentication/authentication.component';
import {
  MatDialog
} from '@angular/material/dialog';
import {AuthenticationService} from '../../services/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private offcanvasService = inject(NgbOffcanvas);
  readonly dialog = inject(MatDialog);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  subscription!: Subscription;
  user: any;
  constructor() {}

  ngOnInit() {
    // this.authenticationService.refresh()?.subscribe();
    this.subscription = this.authenticationService.user$.subscribe(u => this.user = u)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  open() {
    const offcanvasRef = this.offcanvasService.open(MenuComponent,
      { panelClass: 'w-100' });
    offcanvasRef.componentInstance.name = 'World';
  }

  logIn() {
    const dialogRef = this.dialog.open(AuthenticationComponent, {
      disableClose: true,
      maxWidth: '100vw'
    });


  }

  protected readonly close = close;
}
