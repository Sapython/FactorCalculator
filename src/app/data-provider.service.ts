import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProvider {

  constructor() { }
  userData:any;
  isLoggedIn:boolean = false;
}
