import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "navigation",
    templateUrl: "./navigation.component.html"
})

export class NavigationComponent {
    public IsLoggedIn: boolean;

    constructor (private router: Router){}

    ngOnInit() {
        const token = sessionStorage.getItem('token');
        this.IsLoggedIn = !!token;
    }

    logout() {
        sessionStorage.clear();
        this.IsLoggedIn = false;
        this.router.navigate(["login"]);
    }
}