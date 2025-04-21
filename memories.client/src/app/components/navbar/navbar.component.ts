import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from '../../modal/menu/menu.component';
import {AuthenticationComponent} from '../../modal/authentication/authentication.component';
import {
  MatDialog
} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private offcanvasService = inject(NgbOffcanvas);
  readonly dialog = inject(MatDialog);
  user: any;
  constructor() {}

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
