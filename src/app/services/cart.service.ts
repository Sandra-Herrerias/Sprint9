import { ProductCounter } from './../models/product-counter';
import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, VirtualTimeScheduler } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private totalProductsSubject: Subject<number>;
  private totalProducts: number = 0;
  //llista de productes seleccionats
  private cartProducts!: Array<ProductCounter>;



  constructor() {
    this.cartProducts = [];
    this.totalProductsSubject = new Subject<number>();
  }


  /**
   * Afegir un producte nou a la llista
   * @param product 
   */
  addProdToCart(product: Product) {
    var index: number = -1;

    this.cartProducts.find((pc: ProductCounter, i: number) => {
      if (pc.product?.id == product.id) {
        index = i;
      }
    });

    if (index != -1) {
      this.cartProducts[index].quantity++;

    } else {
      let prod: ProductCounter = { product: product, quantity: 1 };
      this.cartProducts.push(prod);
    }
    this.totalProducts++;
    this.totalProductsSubject.next(this.totalProducts);
  }

  removeFromCart(product: Product) {
    var index: number = -1;
    //search for index
    this.cartProducts.find((pc: ProductCounter, i: number) => {
      if (pc.product?.id == product.id && pc.quantity >= 1) {
        index = i;
      } 
    });

    //decrease quantity from the product index found
    this.cartProducts[index].quantity--;

    //removes product in case quantity equals to zero
    if (this.cartProducts[index].quantity == 0) {
      this.cartProducts.splice(index, 1);
    }

    this.totalProducts--;
    this.totalProductsSubject.next(this.totalProducts);
    //insert item number added to cart
  }

  getCart() {
    console.log(this.cartProducts);
    return this.cartProducts;
  }

  getTotalProductsObservable(): Observable<number> {
    return this.totalProductsSubject.asObservable();
  }

  getTotalPrice() : number {
    let totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      totalPrice += (this.cartProducts[i].product!.price! * this.cartProducts[i].quantity!);
    }
    return totalPrice;
  }

  getSubtotalPrice(productCounter: ProductCounter) : number {
    let subtotalPrice = 0;
    let i = -1;
    this.cartProducts.find((pc: ProductCounter, index: number) => {
      if (pc.product?.id == productCounter.product?.id) {
        i = index;
      } 
    });
    subtotalPrice += (this.cartProducts[i].product!.price! * this.cartProducts[i].quantity!);
    return subtotalPrice;
  }

  sendOrder() {
    //print console + alert
  }
}
