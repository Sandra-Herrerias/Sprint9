import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() productInForm!: any;
  @Output() goToProductsList = new EventEmitter<boolean>();
  @Input() categories: Array<any> = [];

  prodForm!: FormGroup;
  showProdForm: boolean = false;
  category!: any;

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductsService) {
  }

  ngOnInit(): void {

    this.prodForm = this.formBuilder.group({
      id: this.productInForm.id,
      title: this.productInForm.title,
      price: [this.productInForm.price, [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: this.productInForm.description,
      category: this.productInForm.category.name
    });

  }

  get f() { return this.prodForm.controls; }

  updateFormSubmit(value: any) {
    let info = {
      "id": value.id,
      "title": value.title,
      "price": value.price,
      "description": value.description,
      "category":{
        "id": value.category.id
      }
    }

    if (info) {
      this.prodService.modifyProduct(info).subscribe(
        (result: any) => {
          if (result) { //success message
            alert("Comentario modificado correctamente");
          } else {//error message
            alert("El comentario no se ha podido modificar");
          }
        });
    } else {//error message
      alert("El comentario no puede estar vacío");
    }
  }

  goBack() {
    this.goToProductsList.emit(this.showProdForm);
  }
}
