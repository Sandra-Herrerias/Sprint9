import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminCategoriesSectionComponent } from './components/admin-categories-section/admin-categories-section.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AddCategoryFormComponent } from './components/add-category-form/add-category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    AdminSectionComponent,
    UserSectionComponent,
    ProductFormComponent,
    AddProductFormComponent,
    ProfileComponent,
    CartComponent,
    AdminCategoriesSectionComponent,
    CategoryFormComponent,
    AddCategoryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
