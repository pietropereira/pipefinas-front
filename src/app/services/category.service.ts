import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { CategoryModel } from '../models/Category.Model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel> {
  
  constructor(public http: HttpService) {
    super('category', http);
   }
}
