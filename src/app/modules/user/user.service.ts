import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from 'src/@core/core-service/api.service';
import { User } from 'src/@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { AdminUser } from 'src/@core/models/adminUser.model';
import { Observable, shareReplay } from 'rxjs';
import { ApiResponse } from 'src/@core/models/core-response-model/response.model';

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
    return this.get('/auth/getUserById/'+ this.authService.currentUserValue?.id).pipe(shareReplay(), tap((res:any)=> {
      if(!res.hasErrors()) {
        this.authService.updateUser(res.data)
      }
    })).subscribe()
  }

  updateAdminUser(payload: AdminUser): Observable<ApiResponse<any>> {
    return this.post(`/auth/updateUser/${this.authService.currentUserValue?.id}`, payload).pipe(shareReplay())
  }

}
