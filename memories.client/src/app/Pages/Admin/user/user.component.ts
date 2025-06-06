import {AfterViewInit, Component, ElementRef, inject, TemplateRef, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../../services/user.service';
import User from '../../../../model/user';
import Role from '../../../../model/role';
import {MatDialog} from '@angular/material/dialog';
import {EditUserComponent} from '../../../components/edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements AfterViewInit {
  userService: UserService = inject(UserService);
  readonly dialog = inject(MatDialog)
  login!:string;
  email!:string;
  role!: any;
  roles!: Role[];
  displayedColumns: string[] = ['login', 'email', 'codeRoles'];
  dataSource = new MatTableDataSource<User>([]);
  itemRole!: Role| null;
  length = 50;
  pageSize = 2;
  pageIndex = 0;
  pageSizeOptions = [2, 5, 10, 25];
  isLoading = false;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  modal = '';
 async ngAfterViewInit() {
  this.roles = await this.userService.getUserRoles_W();
   await this.updateTable();
  }


async updateTable(){
  let login = this.login || '';
  let email = this.email  || '';
  let codeRole = this.itemRole?.code || '';
    this.isLoading = true;
    const data = await this.userService.users_W(this.pageIndex ,this.pageSize, login, email, codeRole);
    this.dataSource.data = data.elements;
    this.length = data.totalCount;
  this.isLoading = false;

  }

async  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    await this.updateTable();
  }

  rolesString(roles: Role[]){
   return roles.map(r=>r.name).join();
  }

async selectOption(option: any) {
    this.itemRole = option;
    this.role = option.name;
    await this.updateTable();
  }
 async clear() {
    this.itemRole = null;
    this.login = '';
   this.email = '';
   this.role = '';
    await this.updateTable();
  }

  clickRow(row: any){
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        user: row,
        roles: this.roles
      },
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        await this.userService.postUpdate_W(result);
        dialogRef.close();
        await this.updateTable();
      }
    });
  }
}
