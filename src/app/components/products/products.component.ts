import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  categoryId!: any;
  products!:any;
  ipp!: number;
  cp!: number;
  showByCategory!:boolean;


  constructor(
    private catService: CategoriesService,
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private router:Router) {
      this.ipp = 10;
      this.cp = 1;
  }

  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id']; 
      this.showByCategory = params['byCategory']; 
      console.log(this.showByCategory);
    });

    if(this.showByCategory){
      this.getProductsByCategory();
    }else{
      this.listProducts();
    }
   
    
  }

  getProductsByCategory(){
   this.catService.getProdByCategory(this.categoryId)
   .subscribe((data:any) =>{
      this.products = data;
   });
  }

  
  listProducts():void{
    this.prodService.getListProducts()
    .subscribe((data:any) => {
      this.products = data;
    });
  }

  getProdDetail(e:any){
    this.router.navigate(['/prodDetail']);
  }
}
