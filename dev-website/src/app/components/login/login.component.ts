import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Login } from '../../models/login';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: Login;

  constructor(private authService : AuthenticationService, private navService: NavigationService) { }

  ngOnInit() {
    this.model = new Login();
  }

  public login() {

    if (this.model.email === undefined || this.model.email.length === 0)
      return;
    if (this.model.password === undefined || this.model.password.length === 0)
      return;

    var nav = this.navService;

    this.authService.Login(this.model.email, this.model.password)
    .then(function(result) {
      if (result) {
        nav.Navigate('/'); //nav home
      } else {

      }
    });
  }

}
