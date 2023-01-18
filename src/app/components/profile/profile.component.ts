import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  loggedIn!: User | null;
  orders: Array<Order> = [];

  constructor(
    public router: Router, 
    private userService: UsersService, 
    private orderService: OrdersService) { }

    ngOnInit(): void {
      this.userService.user.subscribe((result: User) => {
       if (result) {
         this.loggedIn = {
           firstName: result.firstName, 
           lastName: result.lastName, 
           username: result.username,
           password: result.password, 
           id:result.id,
           role:result.role
         };
       }
     });

     this.orders = this.orderService.getOrdersByUser(this.loggedIn!);
    }
}
