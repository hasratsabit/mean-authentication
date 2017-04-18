import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Validate Inputs
    if(!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Fill all fields',
      {cssClass: 'alert-danger', timeout: 3000});
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Not Valid Email',
      {cssClass: 'alert-warning', timeout: 3000});
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success === true) {
        this.flashMessages.show('Successfuly Registered',
        {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }
    })
  }

}
