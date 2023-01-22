import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  get f() { return this.addProdForm.controls; }


  addNewProduct() {
    let info = {
      title: this.addProdForm.value.title,
      price: this.addProdForm.value.price,
      description: this.addProdForm.value.description,
      "categoryId": this.addProdForm.value.category.id,
      images: ["https://placeimg.com/640/480/any"]
    }

    this.newProduct = info;
    if (this.newProduct) {
      this.prodService.addProduct(info).subscribe(
        (result: any) => {
          if (result) {//success message
            alert("Product inserted");
            this.goToProductsList.emit(this.showAddProdForm);
          } else {//error message
            alert("Product couldn't be added");
          }
        }
      );
    } else {//error message
      alert("Product cannot be empty");
    }
  }

  goBack() {
    this.goToProductsList.emit(this.showAddProdForm);
  }
}
