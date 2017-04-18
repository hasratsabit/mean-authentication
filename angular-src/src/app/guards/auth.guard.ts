import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // This service is created to avoid navigation to pages with restriction without password.
  // User can't type on url to get those pages.
  // We pass this method to the routes in the module.
  // This works as sevice and should be imported in the module and providers.

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
