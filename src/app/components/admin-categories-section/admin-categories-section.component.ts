import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-admin-categories-section',
  templateUrl: './admin-categories-section.component.html',
  styleUrls: ['./admin-categories-section.component.css']
})

export class AdminCategoriesSectionComponent implements OnInit {

  categories!: Category[];
  catSelected!: any;
  showForm: boolean = false;
  addCategory: boolean = false;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  showAddCategory() {
    this.addCategory = true;
  }

  /**
   * Lists all products.
   * Inserts name category and id category from each product. 
   * Then, duplicates are removed.
   */
  listCategories(): void {
    if (!this.showForm) {
      this.categoryService.getListCategories()
        .subscribe((data: any) => {
          this.categories = data;
        });
    }
  }

  updatecategory(category: Category) {
    this.catSelected = category;
    console.log(this.catSelected);
    this.showForm = true;
    return this.catSelected;
  }

  /**
   * Show categories list updated
   * @param e 
   */
   showCategories(noShowForm: boolean) {
    this.showForm = noShowForm;
    this.addCategory = false;
    this.listCategories();
  }

}
