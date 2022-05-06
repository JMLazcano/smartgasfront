import { Injectable, OnInit } from '@angular/core';
import { GasComponent } from '../gas/gas.component';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GasData } from './dashboard/gas';

@Injectable({
  providedIn: 'root'
})

export class DashboardService{

   apiUrl = "https://murmuring-mesa-78734.herokuapp.com/";

  constructor(private http: HttpClient) {
  }

  
  public getGasData(): Observable<any> {
    return this.http.get<GasData>(this.apiUrl+"gasData");
  }


  cards() {
    return [20,12];
  }
}
