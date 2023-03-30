import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, BehaviorSubject, takeUntil, map } from 'rxjs';
import { MediaUploadService } from 'src/@core/core-service/media-upload.service';
import { NotificationsService } from 'src/@core/core-service/notifications.service';
import { ApiResponse } from 'src/@core/models/core-response-model/response.model';
import { ResponseAddMedia } from 'src/@core/models/media-upload.model';
import { TuiNotification } from '@taiga-ui/core';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/services/auth.service';
import { AdminUser } from 'src/@core/models/adminUser.model';

@Component({
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit, OnDestroy {
  adminForm!: FormGroup;
  uploadingImage = new Subject<boolean>();
  uploadedImage = new BehaviorSubject<any>({
     captureFileURL: '',
      blurHash: ''
  });
  destroy$ = new Subject();
  updatingProfile = new Subject<boolean>();
  updatingPassword = new Subject<boolean>();

  constructor(
    private media: MediaUploadService,
    private notif: NotificationsService,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.userService.getUser()
  }

  ngOnInit(): void {
    this.initAdminForm(this.auth.currentUserValue);
    this.uploadedImage.next(this.auth.currentUserValue?.media[0]);
  }

  initAdminForm(user: AdminUser | any) {
    this.adminForm = new FormGroup({
      name: new FormControl(user.name || ''),
      email: new FormControl(user.email || ''),
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null),
      media: new FormControl(user.media || {
        captureFileURL: '',
        blurHash: ''
      }),
    })
  }

  get f() {
    return this.adminForm.controls;
  }

  onSelectFile(event: any) {
    let file = event.target.files[0];
    if(file !== undefined && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      this.uploadingImage.next(true);
      this.media.uploadMedia('images', file)
      .pipe(takeUntil(this.destroy$), map((response: ApiResponse<ResponseAddMedia>) => {
        if(!response.hasErrors()) {
          this.uploadedImage.next({
            captureFileURL: response.data?.url,
            blurHash: ''
          })
          return this.uploadedImage
        }
        else {
          this.uploadingImage.next(false);
          return this.notif.displayNotification(response.errors[0]?.error?.message, 'An error has occured', TuiNotification.Error);
        }
      })).subscribe((response: any) => {
        this.f['media']?.setValue([response.value]);
        this.uploadingImage.next(false);
        this.notif.displayNotification('Profile picture uploaded successfully', 'Success!', TuiNotification.Success)
      })
    }
  }

  updateUser() {
    this.updatingProfile.next(true)
    const payload: AdminUser = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      media: this.f['media'].value
    }
    this.userService.updateAdminUser(payload)
    .pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>) => {
      if(!res.hasErrors()) {
        this.notif.displayNotification(res.data.message, 'Profile Update', TuiNotification.Success)
        this.updatingProfile.next(false)
      }
      else {
        this.notif.displayNotification('Something went wrong', 'Profile Update', TuiNotification.Error)
        this.updatingProfile.next(false)
      }
    })
  }

  updatePassword() {
    if(this.f['oldPassword'].value && this.f['newPassword'].value) {
      this.updatingPassword.next(true);
      const payload: any = {
        password: this.f['oldPassword'].value,
        newPassword: this.f['newPassword'].value
      }
      this.auth.updatePassword(payload).pipe(takeUntil(this.destroy$))
      .subscribe((res: ApiResponse<any>) => {
        if(!res.hasErrors()) {
          this.updatingPassword.next(false);
          this.notif.displayNotification('Password updated successfully', 'Password Update', TuiNotification.Success)
        }
        else {
          this.updatingPassword.next(false);
          this.notif.displayNotification('Something went wrong', 'Password Update', TuiNotification.Error)
        }
      })
    }
    else {
      this.notif.displayNotification('Old and New password are required', 'Password Update', TuiNotification.Warning)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

 }
