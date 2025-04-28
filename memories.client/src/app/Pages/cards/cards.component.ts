import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import User from '../../../model/user';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';
import {AreaEditComponent} from '../area/area-edit/area-edit.component';
import {CardEditComponent} from './card-edit/card-edit.component';
import {CardService} from '../../services/card.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit, AfterViewInit {
  cardService: CardService = inject(CardService);

  readonly dialog = inject(MatDialog)
  search!:string;

  displayedColumns: string[] = ['name', 'img', 'accessAreas','pole1','pole2'];
  dataSource = new MatTableDataSource<User>([]);
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

  constructor(private route: ActivatedRoute) {
  }
  areaId!: string;
  id!: string;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.areaId = params.get('areaId') || '';
    });
  }
  async ngAfterViewInit() {
    await this.updateTable();
  }


  async updateTable(){
    // let search = this.search || '';
    // this.isLoading = true;
    // const data = await this.cardService.areas_W(this.pageIndex ,this.pageSize, 'name', '');
    // this.dataSource.data = data.elements;
    // this.length = data.totalCount;
    // this.isLoading = false;

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

  async clear() {
    this.search = '';
    await this.updateTable();
  }

  open(item: any){
   // this.router.navigate(['/cards'], { queryParams: { page: 1, sort: 'asc' } });
  }
  clickRow(row: any){
    const dialogRef = this.dialog.open(AreaEditComponent, {
      data: {
        title: 'Редактировать область.',
        area: row,
      },
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        // await this.areaService.postUpdate_W(result);
        dialogRef.close();
        await this.updateTable();
      }
    });
  }

  createCard(): void {
    const dialogRef = this.dialog.open(CardEditComponent, {
      data: {
        title: 'Создать карточку.',
      },
      width: '40%',
      disableClose: true // Заблокировать закрытие диалога
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        // this.cardService.infoUser();
          result.idArea = this.areaId;
          result.idAreaNavigation = {
            id: this.areaId
          }
          await this.cardService.postCard_W(result);
      }
    });
  }
}
