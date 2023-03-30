import { ChangeDetectionStrategy, Component, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import  { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnDestroy {
  expanded = false;
  searchUser = new FormControl();
  destroy$ = new Subject();
  currentUser: any;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private auth: AuthService,
    private userService: UserService,
    private cf: ChangeDetectorRef
  ) {
    this.searchUser.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(400),
    ).subscribe(val => {
      this.userService.searchStr.emit(val)
    });

    this.currentUser = this.auth.currentUserValue;
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }

  logoutUser() {
    this.auth.logout();
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
