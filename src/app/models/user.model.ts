export interface UserModel {
    Email: string;
    FirstName: string;
    LastName: string;
    Role: string;
    UserId: number;
}

export interface RegisterUserModel {
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
    ConfirmPassword: number;
}