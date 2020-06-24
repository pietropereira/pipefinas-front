import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { IResultHttp } from 'src/app/interfaces/IResultHttp';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {

    urlBase: string = '';

    constructor(public url: string, public http: HttpService) {
        this.urlBase = `${environment.url_api}/${this.url}`;
    }

    public async GetAll(): Promise<IResultHttp>  {
        const url = await this.http.get(`${this.urlBase}`);
        return url;
    }

    public async GetById(uid: string): Promise<IResultHttp> {
        const url = await this.http.get(`${this.urlBase}/${uid}`);
        return url;
    }

    public post(model: T): Promise<IResultHttp> {
        return this.http.post(this.urlBase, model);
    }

    public delete(uid: string): Promise<IResultHttp> {
        return this.http.delete(`${this.urlBase}/${uid}`);
    }
    
}