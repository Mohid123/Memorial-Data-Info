import { ChangeDetectionStrategy, Component, EventEmitter, Output, OnDestroy, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NotificationsService } from 'src/@core/core-service/notifications.service';
import { ApiResponse } from 'src/@core/models/core-response-model/response.model';
import { User } from 'src/@core/models/user.model';
import { UserService } from '../../user.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCardComponent implements OnDestroy {
  constructor(
    private userService: UserService,
    private notif: NotificationsService,
    private cf: ChangeDetectorRef,
    private auth: AuthService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
  ) {
    this.userList$ = this.userService.getAllClients(this.page, this.limit, this.offset, '');
    this.userService.searchStr.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.searchVal = val;
      this.userList$ = this.userService.getAllClients(this.page, this.limit, this.offset, val);
      this.cf.detectChanges()
    });

    this.loggedInUser = this.auth.currentUserValue;
  }

  @Output() editUser = new EventEmitter();
  Arr = Array;
  index = 0;
  userList$!: Observable<any>;
  offset: number = 0;
  limit: number = 7;
  page: number = 1;
  destroy$ = new Subject();
  deleteUserData: any;
  searchVal: string = ''
  @ViewChild('template') template: any;
  loggedInUser: any;

  goToPage(index: number): void {
    this.index = index;
    this.page = index + 1;
    this.userList$ = this.userService.getAllClients(this.page, this.limit, this.offset, this.searchVal);
  }

  deleteUser(id: string) {
    this.userService.deleteClientInfo(id).pipe(takeUntil(this.destroy$))
    .subscribe((res: ApiResponse<any>) => {
      if(!res.hasErrors()) {
        this.userList$ = this.userService.getAllClients(this.page, this.limit, this.offset, this.searchVal);
        this.cf.detectChanges();
        this.notif.displayNotification('Client record removed', 'Delete Record', TuiNotification.Success);
      }
    })
  }

  openDeleteDialog(user: any) {
    if(user) {
      this.deleteUserData = user;
      this.showDialog(this.template)
    }
  }

  editUserData(user: any) {
    this.editUser.emit(user);
  }

  trackByFn(index: number, item: User): string | any {
    return item.id;
  }

  floorNumber(value: number) {
    return Math.round(value)
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content, {
      closeable: true,
      dismissible: false
    }).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
