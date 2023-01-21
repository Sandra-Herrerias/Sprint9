import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminCategoriesSectionComponent } from './components/admin-categories-section/admin-categories-section.component';

const routes: Routes = [
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'products',
  component: ProductsComponent    
},
{
  path: 'prodDetail',
  component: ProductDetailComponent
},
{
  path: 'categories',
  component: CategoriesComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'adminSection',
  component: AdminSectionComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin',
    path: '/adminSection'
  }
},
{
  path: 'adminCatSection',
  component: AdminCategoriesSectionComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin',
    path: '/adminCatSection'
  }
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: '',
  redirectTo: '/products',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/products',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
