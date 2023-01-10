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
    console.log(route.data['role']);//gets role
    let path = '/adminSection';
    //Si la ruta es adminSection y el rol es admin, me tiene que dejar pasar a la vista adminSection
    console.log("Path: " + path);
    console.log("Component: " + route.data['path'] );
    if (user) {
      if (route.data['path'] == path && route.data['role'] != 'admin') {
        return false;
      } else {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
  
}
