import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
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
    private userService: UsersService,
    private cartProdsService: CartService) { }

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
         };     console.log(this.loggedIn);
       }
     });
     this.cartProdsService.getTotalProductsObservable().subscribe(
       (totalProducts: number) => {console.log(totalProducts)}
     );
    }
  
    logout(): void {
      this.userService.logout();
    }

    getProducts() {
      this.router.navigate(['/products']);
    }

    goToCart() {
      this.router.navigate(['/cart']);
    }
}
