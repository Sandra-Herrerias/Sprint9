import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() productInForm!: any;

  prodForm!: FormGroup;
  prodUpdated!: any;

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductsService) {
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.productInForm));
    console.log(typeof (this.productInForm.title));
    console.log(this.productInForm.id);
    console.log(this.productInForm.title);

    this.prodForm = this.formBuilder.group({
      id: this.productInForm.id,
      title: this.productInForm.title
    });

    console.log(this.prodForm.controls );
   
    const obj1: any = {
      id: this.productInForm.id,
      title: this.productInForm.title
    }; //new Product

    this.prodUpdated = obj1;
  }

  get f() { return this.prodForm.controls; }

  updateFormSubmit(value: any) {
    console.log(value.title);
    // let info = {
    //   "id": this.productInForm.id,
    //   "title":  this.prodForm
    // }
    // console.log(info);
    // if (this.prodUpdated) {
    //   this.prodService.modifyProduct(info).subscribe(
    //     (result: any) => {
    //       let res = JSON.parse(JSON.stringify(result));
    //       console.log(res);
    //       console.log(result);
    //       if (result) { //success message
    //         alert("Comentario modificado correctamente");
    //       } else {//error message
    //         alert("El comentario no se ha podido modificar");
    //       }
    //     }
    //   );
    // } else {//error message
    //   alert("El comentario no puede estar vacío");
    // }
  }
}
