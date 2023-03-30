import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ApiService } from 'src/@core/core-service/api.service';
import { User } from 'src/@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { AdminUser } from 'src/@core/models/adminUser.model';
import { Observable, shareReplay, Subject } from 'rxjs';
import { ApiResponse } from 'src/@core/models/core-response-model/response.model';
import { NotificationsService } from 'src/@core/core-service/notifications.service';
import { TuiNotification } from '@taiga-ui/core';

type UserInfo = User
@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<UserInfo> {
  userData = new BehaviorSubject({});
  public searchStr = new EventEmitter<string>();
  singleClient!: Observable<any>;

  constructor(protected override http: HttpClient, private authService: AuthService, private notif: NotificationsService) {
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

  getAllClients(page: number, limit: any, offset: any, searchName: string): Observable<ApiResponse<any>> {
    page--;
    const param: any = {
      limit: limit,
      offset: page ? limit * page : 0,
      searchName: searchName
    }
    return this.get(`/clientinfo/getAllClientInfo`, param).pipe(shareReplay(), map((res: ApiResponse<any>) => {
      if(!res.hasErrors()) {
        return res.data;
      }
      else {
        return this.notif.displayNotification(res.errors[0].error?.message, 'Clients Info', TuiNotification.Error)
      }
    }))
  }

  addNewClient(payload: User): Observable<ApiResponse<any>> {
    return this.post(`/clientinfo/addClientInfo`, payload).pipe(shareReplay());
  }

  getClientInfoById(id: string): Observable<ApiResponse<any>> {
    return this.get(`/clientinfo/getClientInfoById/${id}`).pipe(shareReplay(), map((res: ApiResponse<any>) => {
      if(!res.hasErrors()) {
        return res.data;
      }
      else {
        return this.notif.displayNotification(res.errors[0].error?.message, 'Client details', TuiNotification.Error)
      }
    }))
  }

  deleteClientInfo(id: string): Observable<ApiResponse<any>> {
    return this.get(`/clientinfo/deleteClientInfo/${id}`)
  }

  editClient(payload: any, id: string): Observable<ApiResponse<any>> {
    return this.post(`/clientinfo/updateClientInfo/${id}`, payload)
  }
}
