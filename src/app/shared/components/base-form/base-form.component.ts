import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { switchMap } from 'rxjs/operators';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';
import toastr from 'toastr';
import { BaseModel } from '../../models/baseModel';

export abstract class BaseForm<T extends BaseModel> implements OnInit, AfterContentChecked {

    currentAction: string; //edit or new
    form: FormGroup = new FormGroup({});
    pageTitle: string; //edit or new title 
    errorMsgs: string[] = null;
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    public formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        protected baseSrv: BaseService<T>,
        protected active: ActivatedRoute,
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.setCurrentAction();
        this.loadResource();
        
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;
        this.save();
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
            
        }
    }
 
    protected loadResource() {
        if(this.currentAction === 'edit') {
            this.active.params.subscribe(r => this.getId(r.id));
        }
    }

   
    protected async getId(uid: string){
        const result = await this.baseSrv.GetById(uid);
        if(result.success) {
            this.form.patchValue(result.data);
        }
        else {
            toastr.erro('Erro!');
        }
    }
    
    protected setPageTitle() {
        if (this.currentAction === 'new') {
            this.pageTitle = this.creationPageTitle();
        }
        else {
            this.pageTitle = this.edition();
        }
    }

    protected creationPageTitle(): string {
        return 'Novo';
    }

    protected edition() {
        return 'Edição ';
    }

    protected abstract buildResourceForm(): void;
    protected async abstract save();
    protected abstract successAndError(result: IResultHttp);

}