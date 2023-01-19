import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() categoryInForm!: any;
  @Output() goToCategoriesList = new EventEmitter<boolean>();

  catForm!: FormGroup;
  showCatForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService) {
  }

  ngOnInit(): void {
    this.catForm = this.formBuilder.group({
      name: this.categoryInForm.name,
      image: this.categoryInForm.image
    });
  }

  get f() { return this.catForm.controls; }

  updateFormSubmit(value: any) {
    let info = {
      "name": value.name,
      "image": value.image
    }
 
    if (info) {
      this.categoryService.modifyCategory(info).subscribe(
        (result: any) => {
          if (result) { //success message
            alert("Categoría modificado correctamente");
          } else {//error message
            alert("El categoría no se ha podido modificar");
          }
        });
    } else {//error message
      alert("El categoría no puede estar vacío");
    }
  }

  goBack() {
    this.goToCategoriesList.emit(this.showCatForm);
  }
}
