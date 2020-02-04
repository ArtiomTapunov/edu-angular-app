import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { BasicLayoutComponent } from './layouts/basiclayout.component';
import { NavigationComponent } from './layouts/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { UserCreateComponent } from './users/usercreate.component';
import { AlertComponent } from './notifications/alert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        NavigationComponent,
        BasicLayoutComponent,
        LoginComponent,
        UsersComponent,
        HomeComponent,
        SignUpComponent,
        UserCreateComponent,
        AlertComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        NavigationComponent,
        BasicLayoutComponent,
        LoginComponent,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class ComponentsModule { }