import { Component, OnInit, Injector } from '@angular/core';
import { BaseForm } from 'src/app/shared/components/base-form/base-form.component';
import { CategoryModel } from 'src/app/models/Category.Model';
import { CategoryService } from 'src/app/services/category.service';
import { Validators } from '@angular/forms';
import toastr from 'toastr';
import { ActivatedRoute } from '@angular/router';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseForm<CategoryModel>{
  
    
  category: CategoryModel = new CategoryModel();

  constructor(protected categorySrv: CategoryService, protected injector: Injector, active: ActivatedRoute) { 
    super(injector, categorySrv, active)
  }


  protected buildResourceForm(): void {
    this.form = this.formBuilder.group({
      uid: [null],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  
  protected creationPageTitle(): string {
    return 'Cadastro de nova Categoria';
  }

  protected edition(): string {
    const categoryName = this.category.name || '';
    return `Editando Categoria: ${categoryName}`;
  }


  protected async save() {
    this.category = this.form.value;

    if(this.currentAction === 'new') {
      delete this.category['uid'];
      const result = await this.categorySrv.post(this.category);
      this.successAndError(result);
    }
    else {
      const result = await this.categorySrv.post(this.category);
      this.successAndError(result);
    }
        
  }

  protected successAndError(result: IResultHttp) {
    if(result.success) {
      toastr.success('Categoria salva com sucesso!');
      this.router.navigateByUrl('/categories');
    }
    else {
      toastr.error('Erro ao salvar categoria, tente novamente...');
    }
  }

}
