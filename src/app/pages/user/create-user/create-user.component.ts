import { Component, Injector } from '@angular/core';
import { BaseForm } from 'src/app/shared/components/base-form/base-form.component';
import { UserModel } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';
import toastr from 'toastr';
import { BaseFormUSer } from 'src/app/shared/components/base-form-user/base-form-user.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent extends BaseFormUSer<UserModel> {
  
  user: UserModel = new UserModel();

  constructor(injector: Injector) {
    super(injector);
  }

  protected buildResourceForm(): void {
    this.form = this.formBuilder.group({
      nickName: [null, [Validators.required, Validators.minLength(3)]],
      email:  [null, [Validators.required, Validators.email]],
      password:  [null, [Validators.required]],
      confirmPassword:  [null, [Validators.required]],
    })
  }

  protected async save() {
    this.user = this.form.value;
    const result = await this.userSrv.createUser(this.user);
    this.successAndError(result);
    
  }

  protected successAndError(result: IResultHttp) {
    if(result.success) {
      toastr.success('Usuário cadastrado com sucesso!');
      this.router.navigateByUrl('/login');
    }
    else {
      toastr.error('Erro ao se cadastrar, tente novamente...');
    }
  }

}
