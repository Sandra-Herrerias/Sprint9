import { ProductCounter } from './../../models/product-counter';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: Array<ProductCounter>;
  totalPrice = 0;

  constructor(private cartService: CartService) { }


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
    console.log("sending order!");
  }
}
