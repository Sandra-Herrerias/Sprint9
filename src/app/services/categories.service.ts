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
   * Get all categories
   */
  getProdByCategory(catId:string){
    return this.http.get( `https://api.escuelajs.co/api/v1/categories/${catId}/products`);
  }

  modifyCategory(info: any) {
    let catId = info.id;
    return this.http.put(`https://api.escuelajs.co/api/v1/categories/${catId}`,
      info,
      { responseType: "json" });
  }
}
