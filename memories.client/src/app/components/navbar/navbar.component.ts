import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from '../../modal/menu/menu.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private offcanvasService = inject(NgbOffcanvas);

  open() {
    const offcanvasRef = this.offcanvasService.open(MenuComponent,
      { panelClass: 'w-100' });
    offcanvasRef.componentInstance.name = 'World';
  }

  protected readonly close = close;
}
