import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {

  newProduct!: Product;
  products!:Product[];

  constructor(
    private prodService: ProductsService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  addNewProduct() {
    let info = {
      title: "New Product",
      price: 89485,
      description: "test",
      categoryId: 2,
      images: ["https://placeimg.com/640/480/any"]
    }
    this.newProduct = info;
    console.log(info);

    if (this.newProduct) {
      this.prodService.addProduct(info).subscribe(
        (result: any) => {
          console.log(result);
          if (result) {//success message
            alert("Producto insertado correctamente");
          } else {//error message
            alert("El producto no se ha podido añadir");
          }
        }
      );
    } else {//error message
      alert("El producto no puede estar vacío");
    }
  }

    
  listProducts():void{
    this.prodService.getListProducts()
    .subscribe((data:any) => {
      this.products = data;
      console.log(this.products );
    });
  }

  updateProduct(event:any){
    console.log(event);
  }
}