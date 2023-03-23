import { Component, Inject, ViewChild } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { UserService } from '../user.service';
@Component({
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent {
  @ViewChild('template') template: any;
  @ViewChild('editTemplate') editTemplate: any;
  deleteUserData: any;
  edituserData: any;
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService, private userService: UserService) {}

  deleteUser() {
  }

  openDeleteDialog(user: any) {
    if(user) {
      this.deleteUserData = user;
      this.showDialog(this.template)
    }
  }

  sendEditData(user: any) {
    if(user) {
      this.userService.sendUserForEdit = user;
    }
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content, {
      closeable: true,
      dismissible: false
    }).subscribe();
  }
}
