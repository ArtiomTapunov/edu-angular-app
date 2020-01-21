import { LoginGuard } from './helpers/login.guard';
import { AdminGuard } from './helpers/admin.guard';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { BasicLayoutComponent } from './components/layouts/basiclayout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { SignUpComponent } from './components/signup/signup.component';
import { UserCreateComponent } from './components/users/usercreate.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "",
    component: BasicLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
        canActivate: [LoginGuard]
      }
    ]
  },
  {
    path: "",
    component: BasicLayoutComponent,
    children: [
      {
        path: "signup",
        component: SignUpComponent,
        canActivate: [LoginGuard]
      }
    ]
  },
  {
    path: "users",
    component: BasicLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        component: UsersComponent
      },
      {
        path: "create",
        component: UserCreateComponent,
      },
      {
        path: "create/:page/:id",
        component: UserCreateComponent
      }
    ]
  },
  {
    path: "home",
    component: BasicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
