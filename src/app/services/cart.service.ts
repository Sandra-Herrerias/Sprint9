import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //llista de productes seleccionats
  //

  constructor() { }


  addToCart(product:Product){
    //afegir un producte nou a la llista
  }

  existsProduct(){
    //finds a product in list product
  }

  sendOrder(){
    //print console + alert
  }
  
}
