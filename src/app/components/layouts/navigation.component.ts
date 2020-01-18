import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "navigation",
    templateUrl: "./navigation.component.html"
})

export class NavigationComponent {
    public IsLoggedIn: boolean;
    public IsAdmin: boolean;

    constructor (private router: Router){}

    ngOnInit() {
        const token = sessionStorage.getItem('token');
        this.IsLoggedIn = !!token;

        if (this.IsLoggedIn){
            if (sessionStorage.getItem('userRole') == "Admin")
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
        sessionStorage.clear();
        this.IsLoggedIn = false;
        this.router.navigate(["login"]);
    }
}