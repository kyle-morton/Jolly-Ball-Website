import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationService } from '../services/navigation.service';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public nav: NavigationService) {}

  canActivate() {
    
    return this.auth.User().pipe(map((result: IUser)=>{
      if (result)
        return true;
      else {
        //otherwise, reject navigation and redirect to login page
        this.nav.Navigate('login');
        return false;
      }
    })); 
  }
}
