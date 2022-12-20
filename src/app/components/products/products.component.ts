import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:Array<any>=[];

  constructor(private prodService: ProductsService,
    private router:Router) { }

    ngOnInit(){
      this.listProducts();
    }

    listProducts():void{
      this.prodService.getListProducts().subscribe((data:any) => {
        this.products = data;
      });
    }

    getProdDetail(e:any){
      this.router.navigate(['/prodDetail']);
    }

}
