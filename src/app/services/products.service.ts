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


  modifyProduct(info: any) {
    let prodId = info.id;
    return this.http.put(`https://api.escuelajs.co/api/v1/products/${prodId}`,
      info,
      { responseType: "json" });
  }

  deleteProduct(info: any) {
    let prodId = info.id;
    return this.http.delete(`https://api.escuelajs.co/api/v1/products/${prodId}`,
    info);
  }

  getProductById(info: any) {
    console.log(info);
    let prodId = info.id;
    
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${prodId}`,
    info);
  }
}
