import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { MediaUploadService } from 'src/@core/core-service/media-upload.service';
import { ApiResponse } from 'src/@core/models/core-response-model/response.model';
import { ResponseAddMedia } from 'src/@core/models/media-upload.model';
import { map, takeUntil } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';
import { NotificationsService } from 'src/@core/core-service/notifications.service';

@Component({
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnDestroy {
  userForm!: FormGroup;
  uploadingImage = new Subject<boolean>();
  uploadedImage = new BehaviorSubject<any>({
     captureFileURL: '',
        blurHash: ''
  });
  destroy$ = new Subject<any>();

  constructor(private media: MediaUploadService, private notif: NotificationsService) {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      bio: new FormControl(null, Validators.required),
      profilePic: new FormControl({
        captureFileURL: '',
        blurHash: ''
      })
    })
  }

  get f() {
    return this.userForm.controls;
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
        this.f['profilePic']?.setValue([response.value]);
        this.uploadingImage.next(false);
        this.notif.displayNotification('Profile picture uploaded successfully', 'Success!', TuiNotification.Success)
      })
    }
  }

  submitUserData() {
    console.log(this.userForm.value)
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
