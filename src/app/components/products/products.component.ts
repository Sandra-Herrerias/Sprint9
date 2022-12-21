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
  ipp!: number;
  cp!: number;
  constructor(private prodService: ProductsService,
    private router:Router) { 
      this.ipp = 10;
      this.cp = 1;
    }

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
