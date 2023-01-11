import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
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
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
