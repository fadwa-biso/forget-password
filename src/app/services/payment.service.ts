import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
baseUrl = environment.apiUrl + '/api';

  payWithFawry(data:any):Observable<any>{
 return this.http.post(`${this.baseUrl}/pay/fawry`, data);
  }
}
