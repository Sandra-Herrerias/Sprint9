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
      "id": this.categoryInForm.id,
      "name": value.name,
      "image": value.image
    }
 
    if (info) {
      this.categoryService.modifyCategory(info).subscribe(
        (result: any) => {
          if (result) { //success message
            alert("Category modified");
            this.goToCategoriesList.emit(this.showCatForm);
          } else {//error message
            alert("Category cannot be modified");
          }
        });
    } else {//error message
      alert("Category cannot be empty");
    }
  }

  goBack() {
    this.goToCategoriesList.emit(this.showCatForm);
  }
}
