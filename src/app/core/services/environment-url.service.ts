import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public apiUrl: string = '';
  constructor() { 
    this.apiUrl = environment.urlAddress;
  }
}
