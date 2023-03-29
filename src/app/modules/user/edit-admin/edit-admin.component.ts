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
import { User } from 'src/@core/models/user.model';

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

  constructor(
    private media: MediaUploadService,
    private notif: NotificationsService,
    private userService: UserService,
    private auth: AuthService
  ) {
    // this.userService.getUser().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnInit(): void {
    this.initAdminForm();
    this.auth.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user: User | any) => {
      console.log(user)
    })
  }

  initAdminForm() {
    this.adminForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      profilePic: new FormControl({
        captureFileURL: '',
        blurHash: ''
      }),
    })
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
        // this.f['profilePic']?.setValue([response.value]);
        this.uploadingImage.next(false);
        this.notif.displayNotification('Profile picture uploaded successfully', 'Success!', TuiNotification.Success)
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

 }
