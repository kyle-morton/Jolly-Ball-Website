import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public title: string;
  public linkedIn : string;
  public github : string;
  public email: string;

  constructor() { }

  ngOnInit() {
    this.title = "Hi, I'm Kyle";
    this.linkedIn = environment.links.linkedin;
    this.github = environment.links.github;
    this.email = environment.links.email;
  }

}
