import { AuthService } from './../core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isAuthenticated = false;
  public fullName:string = '';
  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.fullName = this.authService.FullName;
    console.log(this.authService.UserId);
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  public logout = () => {
    this.authService.logout();
  }

}
