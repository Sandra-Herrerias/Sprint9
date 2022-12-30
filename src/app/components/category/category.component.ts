import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  paramsRoute!: any;

  constructor(private catService: CategoriesService,
    private route: ActivatedRoute) {
  }

  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
     
      this.paramsRoute = params['id']; 
      console.log(this.paramsRoute);
    
    });
  }

}
