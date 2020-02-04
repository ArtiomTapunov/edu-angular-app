import { AlertService } from './../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: "logincomponent",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss", "../../shared/form-styles.scss"]
})

export class LoginComponent {
    public isLoading: boolean = false;
    public email: string;
    public password: string;
    public user: UserModel;

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router) {

    }

    ngOnInit() {

    }

    login() {
        this.alertService.clear();

        this.authService.authenticate(this.email, this.password).subscribe(
            x => {
                this.user = x.Data;

                sessionStorage.setItem("user", JSON.stringify(this.user));
                sessionStorage.setItem("userRole", this.user.Role);

                this.router.navigate(["home"]);
            },
            (error: string) => {

                this.alertService.error(error);
                this.alertService.timeoutClear();
            }
        );
    }
}