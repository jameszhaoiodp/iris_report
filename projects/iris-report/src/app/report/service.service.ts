import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = '/';
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    })
  };
  // baseUrl:string = "http://web.ship.iodp.tamu.edu/limsR/IRISNavigationGet-ServiceTest?";
  constructor(private httpClient : HttpClient) {
    this.url = environment.serverUrl;
  }
  getReport(startdate: string, enddate: string){

    return this.httpClient.get(this.url + '/limsR/IRISNavigationGet-ServiceTest?startdate=29/4/2023 23:50:00&enddate=30/4/2023 0:01:00',{responseType: 'text'});
  }
}
