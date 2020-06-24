import { BaseModel } from '../shared/models/baseModel';
import { UserModel } from './User.model';
import { CategoryModel } from './Category.Model';
import { EntryType } from '../enums/EntryType';

export class EntryModel extends BaseModel {

    name: string;
    description: string;
    type: EntryType;
    amount: number;
    paid: boolean;
    date: Date;
    category: CategoryModel;

    constructor() {
        super();
        this.category = new CategoryModel();
    }

}