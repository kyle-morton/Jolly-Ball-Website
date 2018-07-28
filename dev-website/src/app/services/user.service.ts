import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user : Observable<IUser> = this.auth.User();

  constructor(private auth: AuthenticationService) { }
  
}
