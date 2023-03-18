import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, Subject, takeUntil } from 'rxjs';
import { getSessionItem, StorageItem } from 'src/@core/utils/local-storage.utils';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/@core/core-service/notifications.service';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  isSigningIn = new Subject<boolean>();
  destroy$ = new Subject();

  constructor(private auth: AuthService, private router: Router, private notif: NotificationsService) {
    this.initloginForm()
  }

  get f() {
    return this.loginForm.controls;
  }

  initloginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched()
    }
    this.isSigningIn.next(true)
    this.auth.login(this.loginForm.value).pipe(takeUntil(this.destroy$), first()).subscribe(response => {
      if(response) {
        this.notif.displayNotification('You have logged in successfully', 'User Login', TuiNotification.Success);
        this.isSigningIn.next(false);
        setTimeout(() => this.router.navigate(['/user/userListing']), 1000)
      }
    })
    setTimeout(() => this.isSigningIn.next(false), 2000)
  }

  guestSession() {
    this.auth.loginAsGuest();
    const guest = getSessionItem(StorageItem.GuestSession);
    if(guest) {
      this.notif.displayNotification('Your guest session has been created', 'User Login', TuiNotification.Success);
      setTimeout(() => this.router.navigate(['/user/userListing']), 1000)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
