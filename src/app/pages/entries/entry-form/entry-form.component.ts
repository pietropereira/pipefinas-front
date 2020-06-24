import { Component, OnInit, Injector } from '@angular/core';
import { BaseForm } from 'src/app/shared/components/base-form/base-form.component';
import { EntryModel } from 'src/app/models/Entry.Model';
import { EntryService } from 'src/app/services/entry.service';
import { ActivatedRoute } from '@angular/router';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';
import { CategoryModel } from 'src/app/models/Category.Model';
import { Validators } from '@angular/forms';
import toastr from 'toastr';
import { CategoryService } from 'src/app/services/category.service';
import { ISelect } from 'src/app/interfaces/ISelect';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseForm<EntryModel> {

  entry: EntryModel = new EntryModel();
  categories: Array<CategoryModel>;
  entryType: Array<ISelect>;

  constructor(protected entrySrv: EntryService, protected injector: Injector, active: ActivatedRoute, private categorySrv: CategoryService) {
    super(injector, entrySrv, active)
  }

  ngOnInit() {
    super.ngOnInit();
    this.bindCategories();
    this.bindTypes();
  }

  protected creationPageTitle(): string {
    return 'Cadastro de novo Lançamento';
  }

  protected edition(): string {
    const entryName = this.entry.name || '';
    return `Editando Lançamento: ${entryName}`;
  }
  
  protected buildResourceForm(): void {
    this.form = this.formBuilder.group({
      uid: [null],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      type: [1, [Validators.required]],
      amount: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [[], [Validators.required]],
      
    });
  }
  private bindTypes() {
    this.entryType = EntryService.getEntryType();
  }
  
//   categoryB = {
//     categoryInit: null
//   }

  protected async getId(uid: string){

    const result = await this.baseSrv.GetById(uid);
    
    if(result.success) {
        const uidCategory = result.data.category.uid;
        result.data.category = uidCategory;
        this.form.patchValue(result.data);
    }
    else {
        toastr.erro('Erro carregar lançamento');
    }
}

  private async bindCategories() {
    const result = await this.categorySrv.GetAll();
    if(result.success) {
      this.categories = result.data;
    }
    else {
      toastr.error('erro ao carregar categoria');
    }
  }

  protected async save() {
    this.entry = this.form.value;
    
    if(this.currentAction === 'new') {
      delete this.entry['uid'];
      const result = await this.entrySrv.post(this.entry);
      this.successAndError(result);
    }
    else {
      const result = await this.entrySrv.post(this.entry);
      this.successAndError(result);
    }
  }

  protected successAndError(result: IResultHttp) {
    if(result.success) {
      toastr.success('Lançamento salva com sucesso!');
      this.router.navigateByUrl('/entries');
    }
    else {
      toastr.error('Erro ao salvar lançamento, tente novamente...');
    }
  }

 

}
