import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  usersStored!: User[];

  constructor(private formBuilder: FormBuilder,
    public userService: UsersService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    let userFound: User | undefined;
    this.usersStored = this.userService.getUsersStored();
    // stop here if form is invalid
    if (this.loginForm.valid && 
      this.usersStored != null && 
      this.usersStored !== undefined) {

      userFound = this.usersStored.find((userLogged) => { 
        return userLogged.username === this.loginForm.value.username && 
        userLogged.password === this.loginForm.value.password;
      
      });

      if (userFound) this.userService.login(userFound);
      if (!userFound) alert("Wrong credentials");

    } else if(this.loginForm.valid &&
      this.usersStored == null ||
      this.usersStored == undefined){
        alert("Create new user, this one doesn't exist");
    }
  }
}