import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Router redirecciona <-- inyectar en el constructor
  // HttpService es mi servicio
  constructor(private router: Router,
    private service: UsersService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {

    const user = this.service.usuariData();

    //Si la ruta es adminSection y el rol es admin, me tiene que dejar pasar a la vista adminSection
    if (user && route.data['role'] == user.role) {
      return true;
    }

    this.router.navigate(['/products']);
    return false;
  }

}
