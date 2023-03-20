import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() userData: any[] = [
    {
      id: '1',
      username: 'Virgil van Dijk'
    },
    {
      id: '2',
      username: 'Lionel Andres Messi Cuccitini'
    },
    {
      id: '3',
      username: 'Paolo Maldini'
    }
  ];
  @Output() deleteUser = new EventEmitter()
  Arr = Array;
  index = 0;

  goToPage(index: number): void {
    this.index = index;
    console.info('New page:', index);
  }

  deleteUserData(user: any) {
    this.deleteUser.emit(user);
  }
}
