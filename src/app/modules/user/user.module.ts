import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TuiAvatarModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiExpandModule, TuiButtonModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {TuiMarkerIconModule, TuiInputModule, TuiTextAreaModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiPreviewModule } from '@taiga-ui/addon-preview';
import { EditAdminComponent } from './edit-admin/edit-admin.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListingComponent,
    UserCardComponent,
    NavbarComponent,
    CardSkeletonComponent,
    UserDetailsComponent,
    AddNewUserComponent,
    EditAdminComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TuiAvatarModule,
    TuiExpandModule,
    TuiMarkerIconModule,
    TuiPaginationModule,
    TuiButtonModule,
    TuiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextAreaModule,
    TuiPreviewModule
  ]
})
export class UserModule { }
