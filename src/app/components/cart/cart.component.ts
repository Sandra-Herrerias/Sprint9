import { UsersService } from 'src/app/services/users.service';
import { ProductCounter } from './../../models/product-counter';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: Array<ProductCounter>;
  totalPrice = 0;

  constructor(private cartService: CartService,
    private usersService: UsersService) { }


  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeProdCart(pc: ProductCounter) {
    this.cartService.removeFromCart(pc.product!);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  addToCart(pc: ProductCounter) {
    this.cartService.addProdToCart(pc.product!);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  sendOrder(){
    let loggedUser = this.usersService.getLoggedUser();
    if(!loggedUser){
      alert("You should be registered and logged to make an order")
    }else{
      this.cartService.sendOrder();
      this.cart = [];
      this.totalPrice = 0;
    }
  }
}
