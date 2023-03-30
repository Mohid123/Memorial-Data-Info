import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from '../auth/guard/client.guard';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'userListing',
        component: UserListingComponent
      },
      {
        path: 'userDetails/:id',
        component: UserDetailsComponent,
      },
      {
        path: 'addNewUser',
        component: AddNewUserComponent,
        canActivate: [ClientGuard]
      },
      {
        path: 'editUser/:id',
        component: AddNewUserComponent,
        canActivate: [ClientGuard]
      },
      {
        path: 'editAdminUser',
        component: EditAdminComponent,
        canActivate: [ClientGuard]
      },
      {
        path: '',
        redirectTo: 'userListing',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
