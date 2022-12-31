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

  constructor(
    private prodService: ProductsService) { }

  ngOnInit(): void {
    const obj1: Product = {}; //new Product

    this.newProduct = obj1;


  }

  addNewProduct() {
    let info = {
      title: "New Product",
      price: 10,
      description: "A description",
      categoryId: 9846,
      images: ["https://placeimg.com/640/480/any"]
    }

    console.log(info);

    if (this.newProduct) {
      this.prodService.addProduct(info).subscribe(
        (result: any) => {
          console.log(result);
          if (result.success) {//success message
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
}
