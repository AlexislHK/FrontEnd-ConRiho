import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FeathericonComponent } from '../../shared/component/feathericon/feathericon.component';
import { LoginService } from '../../shared/services/login.service';
import { LoginRequest } from '../../shared/model/loginRequest.model';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule, FeathericonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public show: boolean = false;
  public loginForm: FormGroup;
  loginError?:string;

  constructor(
    private fb: FormBuilder, 
    public router: Router,
    private loginService: LoginService
  ) {

    const userData = localStorage.getItem('user');
    if (userData?.length != null) {
      router.navigate(['/pages/sample-page1'])
    }

    this.loginForm = this.fb.group({
      email: ["Test@gmail.com", [Validators.required, Validators.email]],
      password: ["test123", Validators.required],
    });

  }

  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  login() {
    if(this.loginForm.valid){
        this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
          next:(userDt)=>{
            // let user:User = userData;
            localStorage.setItem("user", JSON.stringify(userDt.email));
          },
          error:(errorData)=>{
            // console.log(errorData)
            this.loginError = errorData;
          },
          complete:()=>{
            console.log('el login esta completo.');
            this.router.navigate(["/pages/sample-page1"]);
            // this.loginForm.reset();
          }
        })

      }else{this.loginForm.markAllAsTouched();    }
      
   
   


    // if (this.loginForm.value["email"] == "Test@gmail.com" && this.loginForm.value["password"] == "test123") {
    //   let user = {
    //     email: "Test@gmail.com",
    //     password: "test123",
    //     name: "test user",
    //   };

    //   localStorage.setItem("user", JSON.stringify(user));
    //   // this.router.navigate(["/dashboard/default"]);
    //   this.router.navigate(["/pages/sample-page1"]);
    // }
  }


}
