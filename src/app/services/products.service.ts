import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getListProducts() {
    return this.http.get('https://api.escuelajs.co/api/v1/products');
  }

  addProduct(info: any) {
    return this.http.post("https://api.escuelajs.co/api/v1/products/",
      info,
      { responseType: "json" })
    ;
  }
}
