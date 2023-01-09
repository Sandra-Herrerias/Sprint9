import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  newProduct!: any;
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
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    console.log("CATEGORIES: " + this.categories);
  }

  get f() { return this.addProdForm.controls; }


  addNewProduct() {
    //  TODO Validate price must be number positive (també al form d'editar)
    let info = {
      title: this.addProdForm.value.title,
      price: this.addProdForm.value.price,
      description: this.addProdForm.value.description,
      "categoryId": this.addProdForm.value.category.id,
      images: ["https://placeimg.com/640/480/any"]
    }
    console.log(JSON.stringify(info));
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
