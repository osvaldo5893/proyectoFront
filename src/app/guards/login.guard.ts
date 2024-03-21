import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let permisos: any = {
    "Admin":['home'],
    }
    // console.log("aca", route.url[0].path);
    
    let usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")
	  // console.log("rol",route.url[0].path);

    if (usuarioInfo?.role) {
      this.router.navigate(['/notfound'], { skipLocationChange: true });
      return false;
    }else{
      this.router.navigate(['/404'], { skipLocationChange: true });
      return false;

    }

    
  
  

  }

}
