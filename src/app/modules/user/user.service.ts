import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from 'src/@core/core-service/api.service';
import { User } from 'src/@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

type UserInfo = User
@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<UserInfo> {
  userData = new BehaviorSubject({});

  constructor(protected override http: HttpClient, private authService: AuthService) {
    super(http)
  }

  set sendUserForEdit(user: any) {
    this.userData.next(user)
  }

  get sendUserForEdit() {
    return this.userData.value;
  }

  getUser() {
    return this.get('/users/getUserById/'+ this.authService.currentUserValue?.id).pipe(tap((res:any)=> {
      if(!res.hasErrors()) {
        this.authService.updateUser(res.data)
      }
    }))
  }
}
