import { OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';
import toastr from 'toastr';
import { BaseModel } from '../../models/baseModel';

export abstract class BaseList<T extends BaseModel> implements OnInit {

    resources: T[] = [];

    constructor(protected baseSrv: BaseService<T>) { }

    ngOnInit() {
        this.bind();
    }

    async bind() {
        const resources = await this.baseSrv.GetAll();
        
        if (resources.success) {
            const order = resources.data.sort((a, b) => 0 - (a.createAt > b.createAt ? 1 : -1));
            return this.resources = order;
        }
        else {
            toastr.Error("Erro ao carregar a lista!");
        }
    }

    async delete(resource: T): Promise<void> {
        const mustDelete = confirm(`Deseja realmente deletar esse item`);
        if (mustDelete) {
            const result = await this.baseSrv.delete(resource.uid);
            if (result.success) {
                toastr.success("Deletado com sucesso!");
                this.bind();
            }
            else {
                alert("Erro ao tentar excluir");
            }
        }
    }
}