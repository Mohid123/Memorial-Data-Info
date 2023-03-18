import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { getSessionItem, StorageItem } from 'src/@core/utils/local-storage.utils';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const guest = getSessionItem(StorageItem.GuestSession) || null;
    if (currentUser || guest) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
