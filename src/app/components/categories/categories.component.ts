import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories: Array<any> = [];
  category!: string;

  ipp!: number;
  cp!: number;
  constructor(private router: Router,
    private catService: CategoriesService) {
    this.ipp = 10;
    this.cp = 1;
  }


  ngOnInit(): void {
    this.listCategories();
    this.getCategoriesNames();
  }

  listCategories() {
    this.catService.getListCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });

    return this.categories;
  }

  getCategoriesNames() {

    console.log("NAMES: " + this.categories);

  }

  getCategory(e: any) {
    console.log(e);
    this.router.navigate(['/category']);
  }
}
