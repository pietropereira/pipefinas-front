import { BaseModel } from '../shared/models/baseModel';

export class UserModel extends BaseModel {
    
    nickName: string;
    email: string;
    password: string;
    confirmPassword: string;

    //only change password
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}