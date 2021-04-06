import { UserForAuthenticationDto } from './../../core/models/user-for-authentication-dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthService } from '../../core/authentication/auth.service';
import { GenericValidationService } from '../../core/services/generic-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public showError = false;
  public _returnUrl!: string;
  public errorMessage!: string;

  constructor(public genericValidationService: GenericValidationService, private authService: AuthService,
             private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

  }

  public loginUser = (loginFormValue: any) => {
    const userForAuthentication: UserForAuthenticationDto = {
      userName: loginFormValue.userName,
      password: loginFormValue.password
    };

    console.log(userForAuthentication);
    this.authService.login(userForAuthentication).subscribe((result: any) =>{
     window.localStorage.setItem('token', result.token.authToken);
     this._router.navigate([this._returnUrl]).then(() =>{
       window.location.reload();
     });
    }, (error)=>{
      this.errorMessage = error.error[0].description;
      this.showError = true;
    });
  }

}
