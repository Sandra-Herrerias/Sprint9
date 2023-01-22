import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.css']
})
export class AddCategoryFormComponent implements OnInit{

  newCategory!: any;
  addCatForm!: FormGroup;
  @Output() goToCategoriesList = new EventEmitter<boolean>();
  showAddCatForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService) {
  }


  ngOnInit(): void {
    this.addCatForm = this.formBuilder.group({
      name:  ['', [Validators.required]]
    });
  }

  get f() { return this.addCatForm.controls; }


  addNewCategory() {
    let info = {
      name: this.addCatForm.value.name,
      image: "https://placeimg.com/640/480/any"
    }

    this.newCategory = info;
    console.log(this.newCategory);
    if (this.newCategory) {
      this.categoryService.addCategory(info).subscribe(
        (result: any) => {
          if (result) {//success message
            alert("Categoria insertada correctamente");
          } else {//error message
            alert("La categoria no se ha podido añadir");
          }
        }
      );
    } else {//error message
      alert("La categoria no puede estar vacía");
    }
  }

  goBack() {
    this.goToCategoriesList.emit(this.showAddCatForm);
  }
}
