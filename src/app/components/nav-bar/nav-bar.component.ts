import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

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
           id:result.id
         };
       }
     })
    }
  
    logout(): void {
      this.userService.logout();
    }

    getProducts() {
      this.router.navigate(['/products']);
    }
}
