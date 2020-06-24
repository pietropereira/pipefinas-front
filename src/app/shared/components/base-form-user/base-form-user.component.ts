import { UserModel } from 'src/app/models/User.model';
import { OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';

export abstract class BaseFormUSer<T extends UserModel> implements OnInit {

    form: FormGroup = new FormGroup({});
    submittingForm: boolean = false;

    protected router: Router;
    public formBuilder: FormBuilder;
    protected userSrv: UserService;

    constructor(protected injector: Injector) {
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
        this.userSrv = this.injector.get(UserService);
    }

    ngOnInit() {
        this.buildResourceForm();
    }

    submitForm() {
        this.submittingForm = true;
        this.save();
    }
    protected abstract buildResourceForm(): void;
    protected async abstract save();
    protected abstract successAndError(result: IResultHttp);
}