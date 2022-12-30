import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  
  constructor(private http: HttpClient) { }

  /**
   * Get all categories
   * @returns  categories
   */
  getListCategories(){
    return this.http.get('https://api.escuelajs.co/api/v1/categories');
  }

  /**
   * Get all products by category
   */
  getProdByCategory(catId:string){
    return this.http.get( `https://api.escuelajs.co/api/v1/categories/${catId}/products`);
  }
}
