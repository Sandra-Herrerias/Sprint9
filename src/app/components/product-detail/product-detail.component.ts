import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  
  productId!: number;
  productDetails!: any;
  
  constructor(private route: ActivatedRoute,
    private productService: ProductsService){}

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
    }); 

    if(this.productId){
      let info = {
        id: this.productId
      };
      this.productService.getProductById(info).subscribe(
        (product) => {this.productDetails = product});
    }

  }
}
