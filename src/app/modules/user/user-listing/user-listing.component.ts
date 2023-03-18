import { Component } from '@angular/core';

@Component({
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent {
  Arr = Array;
  index = 0;

  goToPage(index: number): void {
    this.index = index;
    console.info('New page:', index);
  }
}
