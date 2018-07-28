import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../interfaces/iuser';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) { }

  public User() : Observable<IUser> {

    // return this.afAuth.auth.

    return this.afAuth.user
    .pipe(map(currentUser => {

      let user : User = null;

      //parse logged-in user object and return to requestor
      if (currentUser !== null) {
        user = new User();
        user.email = currentUser.email;
      } 

      return user;

    }));
  }

  public Login(email: string, password: string) : Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(function(response) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
  }

  public Logout() : Promise<boolean> {
    return this.afAuth.auth.signOut()
    .then(function(){
      return true;
    })
    .catch(function(){
      return false;
    });
  }

}
