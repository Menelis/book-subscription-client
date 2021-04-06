import { UserForRegistrationDto } from './../../core/models/user-for-registration-dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericValidationService } from '../../core/services/generic-validation.service';
import { AuthService } from '../../core/authentication/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public errorMessage!: string;
  public showError: boolean = false;
  public errors!: string[];

  constructor(public genericValidationService: GenericValidationService, private router: Router,
             private authService:AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    })
  }

  public register = (registerFormValue: any) => {

    const user: UserForRegistrationDto = {
      firstName: registerFormValue.firstName,
      lastName: registerFormValue.lastName,
      email: registerFormValue.email,
      password: registerFormValue.password
    };
    this.authService.register(user).subscribe(response =>{
      console.log(response);
      this.router.navigate(['/account/login']);
    }, (error : any)=>{
      this.errors = error.error.errors;
      console.log(this.errors);
      this.errorMessage = error;
      this.showError = true;
    });
  }
}
