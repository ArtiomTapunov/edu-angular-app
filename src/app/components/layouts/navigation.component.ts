import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "navigation",
    templateUrl: "./navigation.component.html"
})

export class NavigationComponent {
    public IsLoggedIn: boolean;
    public IsAdmin: boolean;

    constructor (
        private router: Router,
        private authService: AuthService
    ){}

    ngOnInit() {
        const currentUser = this.authService.currentUserValue;
        const currentRole = sessionStorage.getItem('userRole');
        this.IsLoggedIn = !!currentUser;
        
        if (this.IsLoggedIn){
            if (currentRole == "Admin")
            {
                this.IsAdmin = true;
            }
            else
            {
                this.IsAdmin = false;
            }
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}