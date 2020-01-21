import { UserModel } from 'src/app/models/user.model';

export interface UserExtendedModel extends UserModel {
    Password?: string;
    PasswordConfirmation?: string;
}