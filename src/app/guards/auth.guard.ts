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
    console.log("User: " + JSON.stringify(user.role));
    if (user &&route.data['path'] == path && route.data['role'] == user.role) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
  
}
