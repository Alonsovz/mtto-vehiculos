import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public getUrlBackEnd() {
    return 'http://192.168.50.65:8095/';
  }
}
