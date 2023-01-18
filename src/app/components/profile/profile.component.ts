import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  loggedIn!: User | null;
  constructor(
    public router: Router, 
    private userService: UsersService) { }

    ngOnInit(): void {
      this.userService.user.subscribe((result: User) => {
       if (result) {
         this.loggedIn = {
           firstName: result.firstName, 
           lastName: result.lastName, 
           password: result.password, 
           username: result.username,
           id:result.id,
           role:result.role
         };
       }
     });

    }
}
