import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import toastr from 'toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  submttingForm: boolean = false;
  newPassord: boolean = false;
  form: FormGroup;

  constructor(
    private userSrv: UserService,
    private router: Router,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm();
    this.isLogged();
  }

  isLogged() {
    if(this.userSrv.isStaticLogged) {
      return this.router.navigateByUrl('/reports');
    }
  }

  private loginForm() {
    this.submttingForm = true;
    this.newPassord = false;
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  async login() {
    const result = await this.userSrv.login(this.form.value.email, this.form.value.password);
    if(result.success) {
      this.userSrv.configureLogin(result);
      this.router.navigateByUrl('/reports');
      
    } else {
      toastr.error('Usuário inválido!');
    }
  }

  async forgotPassword() {
    this.newPassord = true;
    const result = await this.userSrv.forgotPassword(this.form.value.email);
    if(result.success) {
      toastr.success('Nova senha enviada com sucesso!');
      this.router.navigateByUrl('/login');
    }
    else {
      toastr.error('E-mail não encontrado!');
    }
  }

}
