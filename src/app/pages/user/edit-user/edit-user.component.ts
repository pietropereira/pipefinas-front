import { Component, OnInit, Injector } from '@angular/core';
import { BaseFormUSer } from 'src/app/shared/components/base-form-user/base-form-user.component';
import { UserModel } from 'src/app/models/User.model';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';
import { Validators } from '@angular/forms';
import toastr from 'toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends BaseFormUSer<UserModel> {
  
  user: UserModel = new UserModel();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.userUid();
    this.buildResourceForm();
  }

  async getUser(uid: string) {
    const result = await this.userSrv.GetById(uid);
    if(result.success) {
      this.form.patchValue(result.data);

    }
    else {
      toastr.error("Erro ao carregar usuário");
    }
  }


  async userUid() {
    const result = await this.userSrv.GetAll();
    if(result.success) {
      const _id = result.data.map(u => u.uid);
      this.getUser(_id);
    }
  }

  async deleteUser() {
    const result = await this.userSrv.GetAll();
    
    if(result.success) {
      const _user = result.data.map(u => u.uid);
      const del = await this.userSrv.delete(_user);
      if(del.success) {
        toastr.success('Usuário Deletado com sucesso.');
        this.userSrv.logout();
        this.router.navigateByUrl('/home');
      }
      else {
        toastr.error('Ocorreu um erro!')
      }
    }
    else {
      toastr('Erro ao deletar usuário');
    }
  }


  protected buildResourceForm(): void {
    this.form = this.formBuilder.group({
      uid: [],
      nickName: [, [Validators.required]],
      email:  [, [Validators.required]],
      password:  [, [Validators.required]],
      confirmPassword:  [, [Validators.required]],

      //changePassword
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]],
    })
  }
  protected async save() {
    delete this.user['uid'];
    this.user = this.form.value;
    const result = await this.userSrv.post(this.user);
    this.successAndError(result);
  }
  protected successAndError(result: IResultHttp) {
    if(result.success) {
      toastr.success('Usuário editado com sucesso!');
      this.router.navigateByUrl('/categories');
    }
    else {
      toastr.error('Erro ao editar usuário, tente novamente...');
    }
  }
  
  async changePassword() {

    const result = await this.userSrv.changePassword(this.form.value);
    if(result.success) {
      toastr.success('Senha alterada com sucesso');
      this.router.navigateByUrl('/categories');
    }
    else {
      toastr.error('Erro ao alterar senha');
    }
  }

}
