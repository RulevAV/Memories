import {AfterViewInit, Component, inject} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import User from '../../../model/user';
import {PageEvent} from '@angular/material/paginator';
import {AreaEditComponent} from './area-edit/area-edit.component';
import {AreaService} from '../../services/area.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-area',
  standalone: false,
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements AfterViewInit{
  userService: UserService = inject(UserService);
  areaService: AreaService = inject(AreaService);
  readonly dialog = inject(MatDialog)
  name!:string;
  guest!: any;
  users!: User[];
  displayedColumns: string[] = ['name', 'img', 'accessAreas','pole1','pole2'];
  dataSource = new MatTableDataSource<User>([]);
  itemGuest!: any| null;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [ 10, 25];
  isLoading = false;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  mimeType = 'image/jpeg'; // Замените на соответствующий MIME-тип

  constructor(private router: Router) {
  }

  modal = '';
  async ngAfterViewInit() {
    this.users = (await this.userService.users_W(0, 100,  '','', '')).elements;
    
    await this.updateTable();
  }

  test: string = '';

  async updateTable(){
    let name = this.name || '';
    let idGuest = this.itemGuest?.id || '' as string;
    this.isLoading = true;
    const data = await this.areaService.areas_W(this.pageIndex ,this.pageSize, name, idGuest);
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

  areasString(accessAreas: any[]){
    return accessAreas.map(r=> {
      return r.idGuestNavigation.login;
    }).join();
  }

  async selectOption(option: any) {
    this.itemGuest = option;
    this.guest = option.login;
    await this.updateTable();
  }
  async clear() {
    this.itemGuest = null;
    this.name = '';
    this.guest = '';
    await this.updateTable();
  }

  open(item: any){
    this.router.navigate([`/_cards/${ item.id }`])//), { queryParams: { areaId: item.id, id: null } });
  }

  clickRow(row: any){
    const dialogRef = this.dialog.open(AreaEditComponent, {
      data: {
        title: 'Редактировать область.',
        area: row,
        users: this.users
      },
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        await this.areaService.postUpdate_W(row.id, result.file, result.name, result.accessAreas);
        dialogRef.close();
        await this.updateTable();
      }
    });
  }

  createArea(): void {
    const dialogRef = this.dialog.open(AreaEditComponent, {
      data: {
        title: 'Создать область.',
        users: this.users
      },
      width: '40%',
      disableClose: true // Заблокировать закрытие диалога
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        await this.areaService.postArea_W(result.file,result.name, result.accessAreas);
        dialogRef.close();
        await this.updateTable();
      }
    });
  }
}


