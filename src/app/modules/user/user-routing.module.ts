import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'userDetails',
        component: UserDetailsComponent
      },
      {
        path: 'addNewUser',
        component: AddNewUserComponent
      },
      {
        path: 'editUser/:id',
        component: AddNewUserComponent
      },
      {
        path: 'editAdminUser',
        component: EditAdminComponent
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
