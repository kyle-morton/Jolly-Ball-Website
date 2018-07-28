import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed : boolean = true;
  public isLoggedIn: boolean = false;
  
  constructor(private authService : AuthenticationService, private navService: NavigationService) { }


  ngOnInit() {

    this.authService.User()
    .subscribe(user => {
      this.isLoggedIn = user != null; 
    });

  }

  public logout() {

    var nav = this.navService;
    this.authService.Logout()
    .then(function(result) {
        nav.Navigate('/');
    });

  }

}
