import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:8080/api/products?pageSize=10&pageNo=2";
  private categoryUrl = "http://localhost:8080/api/products/category/";
  private searchUrl = "http://localhost:8080/api/products/search/";

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl).pipe(map((response) => {

      return response;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }
  getProductListByCategory(categoryId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.categoryUrl + categoryId).pipe(map((response) => {

      return response;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }

  getProductListByName(keyword: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.searchUrl + keyword).pipe(map((response) => {

      return response;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }

}
