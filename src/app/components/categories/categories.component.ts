import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  category!: string;
  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  getCategory(e: any) {
    console.log(e);
    this.router.navigate(['/category']);
  }
}
