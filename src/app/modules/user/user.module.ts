import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TuiAvatarModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiExpandModule, TuiButtonModule } from '@taiga-ui/core';
import {TuiMarkerIconModule} from '@taiga-ui/kit';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListingComponent,
    UserCardComponent,
    NavbarComponent,
    CardSkeletonComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TuiAvatarModule,
    TuiExpandModule,
    TuiMarkerIconModule,
    TuiPaginationModule,
    TuiButtonModule
  ]
})
export class UserModule { }
