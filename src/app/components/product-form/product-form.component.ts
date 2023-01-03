import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  @Input() productInForm!: any;
  prodForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder){
  }

  ngOnInit():void{
    console.log(JSON.stringify(this.productInForm));
    console.log(typeof(this.productInForm.title));
    console.log(this.productInForm.id);
    console.log(this.productInForm.title);

    

    this.prodForm = this.formBuilder.group({
      id:this.productInForm.id,
      title:this.productInForm.title
    });
  }

  get f() { return this.prodForm.controls; }

  registerFormSubmit(value:any) {
    console.log(value);
  }
}
