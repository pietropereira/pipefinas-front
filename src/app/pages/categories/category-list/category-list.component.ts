import { Component, OnInit } from '@angular/core';
import { BaseList } from 'src/app/shared/components/base-list/base-list.component';
import { CategoryModel } from 'src/app/models/Category.Model';
import { CategoryService } from 'src/app/services/category.service';
import toastr from 'toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseList<CategoryModel> {

  p: number = 1;
  colletion: CategoryModel[] = [];

  constructor(private categorySrv: CategoryService) { 
    super(categorySrv);
  }

  async delete(resource: CategoryModel) {
    const mustDelete = confirm(`Deseja deletar? Você não terá mais acesso a todos os lançamentos relacionados a categoria ${resource.name}`);
    if (mustDelete) {
        const result = await this.baseSrv.delete(resource.uid);
        if (result.success) {
            toastr.success("Excluído com sucesso!");
            this.bind();
        }
        else {
            alert("Erro ao tentar excluir");
        }
    }

  }
}
