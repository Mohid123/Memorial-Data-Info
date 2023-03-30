import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getItem, removeSessionItem, setItem, setSessionItem, StorageItem } from '../../../../@core/utils/local-storage.utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap, shareReplay } from 'rxjs/operators';
import { RegisterModel } from '../../../../@core/models/register.model';
import { AuthCredentials } from '../../../../@core/models/auth-credentials.model';
import { ApiResponse } from '../../../../@core/models/core-response-model/response.model'
import { SignInResponse } from '../../../../@core/models/sign-in-response.model';
import { ApiService } from '../../../../@core/core-service/api.service';
import { NotificationsService } from 'src/@core/core-service/notifications.service';
import { TuiNotification } from '@taiga-ui/core';
import { AdminUser } from 'src/@core/models/adminUser.model';

type AuthApiData = SignInResponse | any;

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService<AuthApiData> {

  currentUser$: Observable<AdminUser | null>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<AdminUser | null>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: AdminUser | null) {
    this.currentUserSubject.next(user);
  }

  get JwtToken(): string {
    return getItem(StorageItem.JwtToken)?.toString() || '';
  }

  constructor(
    protected override http: HttpClient,
    private router: Router,
    private notif: NotificationsService
  ) {
    super(http);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<AdminUser | null>(<AdminUser>getItem(StorageItem.User));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();

  }

  // public methods
  login(params: AuthCredentials) {
    this.isLoadingSubject.next(true);
    return this.post('/auth/login', params).pipe(
      shareReplay(),
      map((result: ApiResponse<any>) => {
        if (!result.hasErrors()) {
          setItem(StorageItem.User, result?.data?.user || null);
          setItem(StorageItem.JwtToken, result?.data?.token || null);
          if(result?.data?.user)
          this.currentUserSubject.next(result?.data?.user);
          return result
        }
        else {
          this.notif.displayNotification(result.errors[0]?.error?.message, 'Login Failed!', TuiNotification.Error);
          throw result.errors[0]?.error?.message
        }
      }),
      exhaustMap((res)=>{
        if (res?.data?.user) {
          return this.get(`/auth/getUserById/${res.data.user.id}`)
        } else {
          return of(null);
        }
      }),
      tap((res)=> {
        if(res && !res?.hasErrors()) {
          this.updateUser(res.data)
        }
      }),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    setItem(StorageItem.User, null);
    setItem(StorageItem.JwtToken, null);
    removeSessionItem(StorageItem.GuestSession);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  registration(user: RegisterModel) {
    this.isLoadingSubject.next(true);
    return this.post('/auth/signup',user).pipe(
      map((user:ApiResponse<SignInResponse>) => {
        this.isLoadingSubject.next(false);
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updatePassword(payload: any): Observable<ApiResponse<any>> {
    return this.post(`/auth/updatePassword/${this.currentUserValue?.id}`, payload);
  }

  updateUser(user: AdminUser) {
    if (user) {
      this.currentUserSubject.next(user);
      this.currentUserValue = user
      setItem(StorageItem.User, user);
    }
  }

  loginAsGuest() {
    setSessionItem(StorageItem.GuestSession, 'Logged in as guest')
  }
}
