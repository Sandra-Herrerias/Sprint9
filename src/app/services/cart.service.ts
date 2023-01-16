import { ProductCounter } from './../models/product-counter';
import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
    this.cartProducts.find((pc: ProductCounter, i: number) => {
      if (pc.product?.id == product.id && pc.quantity >= 1) {
        index = i;
        pc.quantity--;

        if(pc.product?.id && pc.quantity == 0){
          this.cartProducts.slice(index,1);
        }
      }
    });
    this.totalProducts--;
    //insert item number added to cart
  }



  getCart() {
    console.log(this.cartProducts);
    return this.cartProducts;
  }

  getTotalProductsObservable(): Observable<number> {
    return this.totalProductsSubject.asObservable();
  }

  sendOrder() {
    //print console + alert
  }

}
