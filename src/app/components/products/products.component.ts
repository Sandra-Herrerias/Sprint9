import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /** GENERAL VARIABLES */
  categoryId!: any;
  products!: any;
  ipp!: number;
  cp!: number;
  showByCategory!: boolean;

  /** CART VARIABLES */
  //Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
  cartList = [];
  cart = [];
  total = 0;
  totalQuantity = 0;

  constructor(
    private catService: CategoriesService,
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.ipp = 10;
    this.cp = 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id'];
      this.showByCategory = params['byCategory'];
      console.log(this.showByCategory);
    });

    if (this.showByCategory) {
      this.getProductsByCategory();
    } else {
      this.listProducts();
    }
  }


  /** GENERAL FUNCTIONS */

  getProductsByCategory() {
    this.catService.getProdByCategory(this.categoryId)
      .subscribe((data: any) => {
        this.products = data;
      });
  }


  listProducts(): void {
    this.prodService.getListProducts()
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  getProdDetail(e: any) {
    this.router.navigate(['/prodDetail']);
  }


  /** CART FUNCTIONS */

  addToCart(id: number) {
    let product;

    // 1. Loop for to the array products to get the item to add to cart
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        product = this.products[i];
      }
    }
    console.log("PRODUCT: " + product);
  }
}
