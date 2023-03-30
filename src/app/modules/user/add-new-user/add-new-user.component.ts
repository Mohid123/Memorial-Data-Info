import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { BehaviorSubject, pluck, Subject, switchMap } from 'rxjs';
import { MediaUploadService } from 'src/@core/core-service/media-upload.service';
import { ApiResponse } from 'src/@core/models/core-response-model/response.model';
import { ResponseAddMedia } from 'src/@core/models/media-upload.model';
import { map, takeUntil } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';
import { NotificationsService } from 'src/@core/core-service/notifications.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  uploadingImage = new Subject<boolean>();
  uploadedImage = new BehaviorSubject<any>({
     captureFileURL: '',
     blurHash: ''
  });
  destroy$ = new Subject<any>();
  user: any;
  editMode$ = new BehaviorSubject<boolean>(false);
  addingUser = new Subject<boolean>()

  constructor(
    private media: MediaUploadService,
    private notif: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
    ) {
    this.activatedRoute.params.pipe(pluck('id'), switchMap(id => id ? this.userService.getClientInfoById(id): ''))
    .subscribe((val: any) => {
      if(val !== '') {
        this.user = val;
        this.initUserForm(val);
        this.uploadedImage.next(val?.media);
        this.editMode$.next(true);
      }
    });

    this.router.events.forEach((event: any) => {
      if(event instanceof NavigationStart) {
        this.userService.sendUserForEdit = {};
      }
    })
  }

  ngOnInit(): void {
    if(Object.keys(this.userService.sendUserForEdit).length > 0) {
      this.initUserForm(this.userService.sendUserForEdit);
      this.user = this.userService.sendUserForEdit;
      if(this.user?.media) this.uploadedImage.next(this.user?.media[0]);
      this.initUserForm(this.user);
      this.editMode$.next(true);
    }
    else {
      this.initUserForm();
      this.editMode$.next(false);
    }
  }

  initUserForm(user?: any) {
    this.userForm = new FormGroup({
      firstName: new FormControl(user?.firstName || null),
      middleName: new FormControl(user?.middleName || null),
      lastName: new FormControl(user?.lastName || null),
      designation: new FormControl(user?.designation || null),
      bio: new FormControl(user?.bio || null),
      media: new FormControl(user?.media || [])
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
        this.f['media']?.setValue([response.value]);
        this.uploadingImage.next(false);
        this.notif.displayNotification('Profile picture uploaded successfully', 'Success!', TuiNotification.Success)
      })
    }
  }

  submitUserData() {
    if(this.editMode$.value === false) {
      this.addingUser.next(true)
      this.userService.addNewClient(this.userForm.value).pipe(takeUntil(this.destroy$))
      .subscribe((res: ApiResponse<any>) => {
        if(!res.hasErrors()) {
          this.addingUser.next(false)
          this.notif.displayNotification('New user added', 'Add new user', TuiNotification.Success);
          this.userForm.reset()
          this.uploadedImage.next({
            captureFileURL: '',
            blurHash: ''
          })
        }
        else {
          this.addingUser.next(false)
          this.notif.displayNotification(res?.errors[0]?.error?.message, 'Add new user', TuiNotification.Error)
        }
      })
    }
    else if(this.editMode$.value === true) {
      this.addingUser.next(true)
      this.userService.editClient(this.userForm.value, this.user.id).pipe(takeUntil(this.destroy$))
      .subscribe((res: ApiResponse<any>) => {
        if(!res.hasErrors()) {
          this.addingUser.next(false)
          this.notif.displayNotification('User updated', 'Update user', TuiNotification.Success);
          this.userForm.reset();
          this.router.navigate(['/user/userListing'])
        }
        else {
          this.addingUser.next(false)
          this.notif.displayNotification(res?.errors[0]?.error?.message, 'Update user', TuiNotification.Error)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
