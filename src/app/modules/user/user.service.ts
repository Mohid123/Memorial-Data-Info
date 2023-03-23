import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData = new BehaviorSubject({});

  constructor() { }

  set sendUserForEdit(user: any) {
    this.userData.next(user)
  }

  get sendUserForEdit() {
    return this.userData.value;
  }
}
