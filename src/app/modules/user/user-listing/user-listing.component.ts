import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
@Component({
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnDestroy {
  edituserData: any;
  destroy = new Subject();

  constructor(
    private userService: UserService
  ) {}

  sendEditData(user: any) {
    if(user) {
      this.userService.sendUserForEdit = user;
    }
  }

  ngOnDestroy(): void {
    this.destroy.complete();
    this.destroy.unsubscribe();
  }
}
