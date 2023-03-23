import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/@core/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() userData: User[] = [
    {
      id: '1',
      firstName: 'Virgil',
      middleName: 'van',
      lastName: 'Dijk',
      designation: 'Center Back',
      bio: 'Center back for Liverpool. Currently having a poor season. Nominated for Fifa best player in 2019.',
      profilePic: {
        captureFileURL: '../../../../../assets/Memorial Data Info.png',
        blurHash: ''
      }
    }
  ];
  @Output() deleteUser = new EventEmitter()
  @Output() editUser = new EventEmitter()
  Arr = Array;
  index = 0;

  goToPage(index: number): void {
    this.index = index;
  }

  deleteUserData(user: any) {
    this.deleteUser.emit(user);
  }

  editUserData(user: any) {
    this.editUser.emit(user);
  }
}
