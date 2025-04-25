import {Component, inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from '../../modal/menu/menu.component';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../services/core/authentication.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private offcanvasService = inject(NgbOffcanvas);
  // readonly dialog = inject(MatDialog);
  private modalService = inject(NgbModal);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  userService: UserService = inject(UserService);
  subscription!: Subscription;
  user: any;
  constructor() {}

  ngOnInit() {
     this.subscription = this.authenticationService.user$.subscribe( async u => {
       this.user = u;});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  open() {
    const offcanvasRef = this.offcanvasService.open(MenuComponent,
      { panelClass: 'w-100' });
    offcanvasRef.componentInstance.name = 'World';
  }

  logIn(content: TemplateRef<any>) {
    // const dialogRef = this.dialog.open(AuthenticationComponent, {
    //   disableClose: true,
    //   // width: '400px'
    // });
    this.modalService.open(content, { size: 'md', centered: true });

  }

  protected readonly close = close;
}
