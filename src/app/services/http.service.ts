import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResultHttp } from '../interfaces/IResultHttp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private createHeader(header?: HttpHeaders): HttpHeaders {

    if (!header)
      header = new HttpHeaders();

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    const token = localStorage.getItem('personfinance:token');

    if (token)
      header = header.append('x-token-access', token);

    return header;
  }

  public get(url: string): Promise<IResultHttp> {

    const header = this.createHeader();
    return new Promise(async (resolve) => {
      try {
        const res = await this.http.get(url, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
      
      } catch (error) {
        resolve({ success: false, data: {}, error });
      }
    });
  }


  public post(url: string, model: any): Promise<IResultHttp> {
    const header = this.createHeader();
    return new Promise(async (resolve) => {
      try {
        const res = await this.http.post(url, model, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
      } catch (error) {
        resolve({ success: false, data: {}, error: error });
      }
    });
  }

  public delete(url: string): Promise<IResultHttp> {
    const header = this.createHeader();
    return new Promise(async (resolve) => {
      try {
        const res = await this.http.delete(url, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
      } catch (error) {
        resolve({ success: false, data: {}, error: error });
      }
    });
  }
}
