import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(){
        return this.authService.user$.map(user => {
            if(user) return true;

            this.router.navigate(['']);
            return false;
        })
    }
}