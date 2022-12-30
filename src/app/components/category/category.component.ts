import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categoryId!: any;
  products!:any;
  ipp!: number;
  cp!: number;
  constructor(private catService: CategoriesService,
    private route: ActivatedRoute) {
      this.ipp = 10;
      this.cp = 1;
  }

  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
     
      this.categoryId = params['id']; 
      console.log(this.categoryId);
    
    });

    this.printId();
    this.getProductsByCategory();
  }

  printId(){
    console.log("PRINT" + this.categoryId);
  }

  getProductsByCategory(){
   this.catService.getProdByCategory(this.categoryId)
   .subscribe((data:any) =>{
      this.products = data;
   });
    console.log(this.products);
  }

}
