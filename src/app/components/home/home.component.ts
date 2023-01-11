import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminExists: boolean = false;
  usersInLocalStorage!: Array<User>;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.usersInLocalStorage = this.userService.getUsersStored();
    console.log("USERS STORED: " + JSON.stringify(this.userService.getUsersStored()));

    if (this.usersInLocalStorage != null && this.usersInLocalStorage != undefined) {
      this.usersInLocalStorage.find((user: User) => {
        if (user.role === "admin") {
          this.adminExists = true;
        }
      });
    }
      
    

    if (!this.adminExists) {

      const mainUser: User = {
        id: 1,
        username: 'admin@admin.com',
        password: '123456',
        firstName: 'adminName',
        role: 'admin'
      };

      this.userService.register(mainUser);
      console.log(mainUser);
    }
  }
}
