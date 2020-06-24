import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { UserModel } from '../models/User.model';
import { Subject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

  loginSubject = new Subject<boolean>();

  constructor(public http: HttpService) {
    super('users', http);
  }

  createUser(user: UserModel) {
    return this.http.post(`${environment.url_api}/users/create`, user);
  }

  login(email: string, password: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}/users/auth`, { email, password });
  }

  forgotPassword(email: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}/users/forgotpassword`, { email });
  }

  changePassword(user: UserModel) {
    return this.http.post(`${environment.url_api}/users/changepassword`, user);
  }

  configureLogin(obj: any) {
    const { token, user } = obj.data;
    localStorage.setItem('personfinance:token', token);
    // localStorage.setItem('personfinance:user', JSON.stringify(user));
    this.loginSubject.next(this.isStaticLogged);
  }

  checkEmail(email: string) {
    return this.http.post(`${environment.url_api}/users/checkemail`, { email });
  }

  logout() {
    localStorage.removeItem('personfinance:token');
    this.loginSubject.next(false);
  }

  get isLogged(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  get isStaticLogged(): boolean {
    return !!localStorage.getItem('personfinance:token');
  }
}
