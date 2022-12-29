import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getListCategories(){
    return this.http.get('https://api.escuelajs.co/api/v1/categories');
  }

}
