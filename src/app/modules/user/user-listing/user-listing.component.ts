import { Component, Inject, ViewChild } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
@Component({
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent {
  @ViewChild('template') template: any;
  deleteUserData: any;
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService) {}

  deleteUser() {
  }

  openDeleteDialog(user: any) {
    if(user) {
      this.deleteUserData = user;
      this.showDialog(this.template)
    }
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content, {
      closeable: true,
      dismissible: false
    }).subscribe();
  }
}
