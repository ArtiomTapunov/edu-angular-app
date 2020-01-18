import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "logincomponent",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})

export class LoginComponent {
    public isLoading: boolean = false;
    public email: string;
    public password: string;

    constructor (
        private authService: AuthService,
        private router: Router) {

    }

    login() {
        this.authService.authenticate(this.email, this.password).subscribe(x => {
            sessionStorage.setItem("token", x.access_token);
            this.router.navigate(["home"]);
        })
    }
}