import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit{

  newProduct!: Product;
  addProdForm!: FormGroup;
  @Input() categories: Array<any> = [];
  @Output() goToProductsList = new EventEmitter<boolean>();
  showAddProdForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductsService) {
  }


  ngOnInit(): void {
    this.addProdForm = this.formBuilder.group({
      id:['', [Validators.required]],
      title:['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    console.log("CATEGORIES: " + this.categories);
  }

  get f() { return this.addProdForm.controls; }


  addNewProduct() {

    let info = {
      title: "New Product",
      price: 89485,
      description: "test",
      category: {
        id: 2
      },
      images: ["https://placeimg.com/640/480/any"]
    }
    this.newProduct = info;
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

  goBack() {
    this.goToProductsList.emit(this.showAddProdForm);
  }
}
