import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarsuService } from './marsu.service';

@Injectable({
  providedIn: 'root'
})
export class CloseSignCompGuard implements CanActivate {
  authState = localStorage.getItem('authState')
  constructor(private router: Router, private service: MarsuService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authState == undefined || this.router.parseUrl('/note')
  }

}
