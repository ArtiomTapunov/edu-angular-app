import { LoginComponent } from './login/login.component';
import { BasicLayoutComponent } from './layouts/basiclayout.component';
import { NavigationComponent } from './layouts/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { UserCreateComponent } from './users/usercreate.component';
import { AlertComponent } from './notifications/alert.component';

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
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        NavigationComponent,
        BasicLayoutComponent,
        LoginComponent
    ]
})

export class ComponentsModule { }