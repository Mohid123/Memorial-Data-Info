import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TuiAvatarModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiExpandModule } from '@taiga-ui/core';
import {TuiMarkerIconModule} from '@taiga-ui/kit';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListingComponent,
    UserCardComponent,
    NavbarComponent,
    CardSkeletonComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TuiAvatarModule,
    TuiExpandModule,
    TuiMarkerIconModule,
    TuiPaginationModule
  ]
})
export class UserModule { }
