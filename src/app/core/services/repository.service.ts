import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from '../services/environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private _http: HttpClient, private _env: EnvironmentUrlService) { }


  public getData = (route: string) =>{
    return this._http.get(this.createCompleteRoute(route));
  }
  public create = (route:string, body: any) =>{
    return this._http.post(this.createCompleteRoute(route), body);
  }
  private createCompleteRoute = (route: string) =>{
    return `${this._env.apiUrl}${route}`;
  }
}
