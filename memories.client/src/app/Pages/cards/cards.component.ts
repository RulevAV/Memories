import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import User from '../../../model/user';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';
import {AreaEditComponent} from '../area/area-edit/area-edit.component';
import {CardEditComponent, DialogData} from './card-edit/card-edit.component';
import {CardService} from '../../services/card.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ConfirmComponent, ConfirmDataType } from '../../components/dialogs/confirm/confirm.component';
import { Card } from '../../../model/card';

@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  cardService: CardService = inject(CardService);

  readonly dialog = inject(MatDialog)
  search:string = '';

  displayedColumns: string[] = ['title','content', 'img', 'pole1', 'pole2','pole3', 'pole4', 'pole5'];
  dataSource = new MatTableDataSource<Card>([]);
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

  constructor(private route: ActivatedRoute, private router: Router) {
  }
  areaId!: string;
  idParent!: string | undefined| null;

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.areaId = params.get('areaId') || '';
      this.idParent = params.get('idParent')?.trim() || null;
      await this.updateTable();
    });
  }

  async updateTable(){
    this.isLoading = true;
    const data = await this.cardService.cards_W(this.pageIndex ,this.pageSize, this.search, this.areaId, this.idParent);
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

  async clear() {
    this.search = '';
    await this.updateTable();
  }

  open(item: any){
    this.router.navigate([`/_cards/${ this.areaId }/${item.id} `])//), { queryParams: { areaId: item.id, id: null } });
  }

  test(Card: any, isGlobal: any){
    this.router.navigate([`/_lesson/${Card.id}/${isGlobal} `])//), { queryParams: { areaId: item.id, id: null } });
  }
  clickRow(row: Card){
    const dialogRef = this.dialog.open(CardEditComponent, {
      data: {
        title: 'Редактировать область.',
        card: row,
      },
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        result.idArea = this.areaId;
        result.idParent = this.idParent;
        
        await this.cardService.postUpdate_W(row.id, result.file, result.idArea, result.card.title, result.card.content, result.idParent);
        dialogRef.close();
        await this.updateTable();
      }
    });
  }

  deleteRow(row: Card){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Предупреждение!!!',
        context: `Вы действительно хотите удалить "${row.title}"?`,
      } as ConfirmDataType,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.cardService.delete_W(row.id);
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
        result.idArea = this.areaId;
        result.idParent = this.idParent;
        
        await this.cardService.postCard_W(result.file, result.idArea, result.card.title, result.card.content, result.idParent);
        await this.updateTable();
      }
    });
  }
}
