import { ProductCounter } from './../models/product-counter';
import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private totalProducts = 0;
  //llista de productes seleccionats
  private cartProducts!: Array<ProductCounter>;

  constructor() {
    this.cartProducts = [];
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
  }

  getCart() {
    console.log(this.cartProducts);
    return this.cartProducts;
  }

  numberProductsCart() {
    return this.totalProducts;
  }

  sendOrder() {
    //print console + alert
  }

}
