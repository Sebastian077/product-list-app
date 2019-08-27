import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  apiUrl = 'https://62xzeyvxe9.execute-api.us-east-1.amazonaws.com/default'

  constructor(
    private http: HttpClient,
  ) {}

  getProducts() {
    return this.http.get(this.apiUrl + '/getProducts?TableName=productList')
  }

  updateProduct(data) {
    return this.http.post(this.apiUrl + '/updateProduct', data);
  }
}
