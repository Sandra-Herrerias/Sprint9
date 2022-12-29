import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  submitted = false;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.valid) {
      let existsUser = this.userService.getUsersStored().some(user => {
        let currentUser = user.username;
        let formUser = this.registerForm.value.username;
        return currentUser == formUser;
      });

      if (existsUser) {
        alert("Insert new username, this one already exists");
      } else {
        this.userService.register(this.registerForm.value);
        this.registerForm.reset();
      }

    } else {
      return;
    }
  }
}


