import { AlertService } from './../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: "logincomponent",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss", "../../shared/form-styles.scss"]
})

export class LoginComponent {
    public password: string;
    public user: UserModel;
    public loginForm: FormGroup;
    public submitted = false;

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private router: Router) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get field() { return this.loginForm.controls }

    login() {
        this.submitted = true;
        this.alertService.clear();

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.authenticate(this.field.email.value, this.field.password.value).subscribe(
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