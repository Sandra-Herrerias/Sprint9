import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() productInForm!: any;
  @Output() goToProductsList = new EventEmitter<boolean>();
  @Input() categories: Array<string> = [];

  prodForm!: FormGroup;
  showProdForm: boolean = false;
  category!: string;

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductsService) {
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.productInForm));
    console.log(this.productInForm.category.name);
    console.log(typeof (this.productInForm.title));
    console.log(this.productInForm.id);
    console.log(this.productInForm.title);

    this.prodForm = this.formBuilder.group({
      id: this.productInForm.id,
      title: this.productInForm.title,
      price: this.productInForm.price,
      description: this.productInForm.description,
      category: this.productInForm.category.name
    });

    console.log(this.prodForm.controls);
    console.log(this.categories);

  }


  get f() { return this.prodForm.controls; }

  updateFormSubmit(value: any) {
    let info = {
      "id": value.id,
      "title":  value.title,
      "price": value.price,
      "description": value.description,
      "category": value.category.name
    }
    //TODO no esta arribant el valor de category
    console.log("INFOOOO" + JSON.stringify(info));
    if (info) {
      this.prodService.modifyProduct(info).subscribe(
        (result: any) => {
          let res = JSON.parse(JSON.stringify(result));
          console.log(res);
          console.log(result);
          if (result) { //success message
            alert("Comentario modificado correctamente");
          } else {//error message
            alert("El comentario no se ha podido modificar");
          }
        }
      );
    } else {//error message
      alert("El comentario no puede estar vacío");
    }
  }

  goBack(){
    this.goToProductsList.emit(this.showProdForm);
  }
}
