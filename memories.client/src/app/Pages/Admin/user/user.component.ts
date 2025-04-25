import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../../services/user.service';
import User from '../../../../model/user';
import Role from '../../../../model/role';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements AfterViewInit {
  userService: UserService = inject(UserService);
  filterForm = new FormGroup({
    login: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
  });

  displayedColumns: string[] = ['login', 'email', 'codeRoles'];
  dataSource = new MatTableDataSource<User>([]);

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

 async ngAfterViewInit() {
  await this.updateTable();
  }

async updateTable(){
    const data = await this.userService.users_W(this.pageIndex,this.pageSize);
    this.dataSource.data = data.elements;
    this.length = data.totalCount;
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

  searchTerm: string = '';
  items: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Honeydew'];

  get filteredItems() {
    return this.items.filter(item => item.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
