import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

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
  adminExists: boolean = false;
  usersInLocalStorage!: Array<User>;

  /** CART VARIABLES */
  //Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
  cartList = [];
  cart = [];

  constructor(
    private catService: CategoriesService,
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartProdsService: CartService,
    private router: Router,
    private userService: UsersService) {
    this.ipp = 10;
    this.cp = 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id'];
      this.showByCategory = params['byCategory'];
    });

    if (this.showByCategory) {
      this.getProductsByCategory();
    } else {
      this.listProducts();
    }

    this.usersInLocalStorage = this.userService.getUsersStored();

    if (this.usersInLocalStorage != null && this.usersInLocalStorage != undefined) {
      this.usersInLocalStorage.find((user: User) => {
        if (user.role === "admin") {
          this.adminExists = true;
        }
      });
    }

    if (!this.adminExists) {
      const mainUser: User = {
        id: 1,
        username: 'admin@admin.com',
        password: '123456',
        firstName: 'admin',
        lastName: 'admin',
        role: 'admin'
      };

      this.userService.register(mainUser);
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

  getProdDetail(product: any) {
    this.router.navigate(['/prodDetail'], { queryParams: { productId: product.id } });
  }

  /** CART FUNCTIONS */

  addToCart(id: number) {

    this.products.find((p: Product) => {
      if (p.id == id) {
        this.cartProdsService.addProdToCart(p);
      }
    });
  }
}
