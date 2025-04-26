import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../../services/user.service';
import User from '../../../../model/user';
import Role from '../../../../model/role';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject
} from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

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

  model: any;

  // @ts-ignore
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === '' ? states : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ),
    );
  };
  onItemSelected(event: any) {
    const selectedItem = event.item; // Usually `item` contains the selected item
    console.log('Selected Item:', event);
    // Update your model or perform other actions
  }
}

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
