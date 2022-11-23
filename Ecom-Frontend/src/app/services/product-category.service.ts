import { map, Observable, catchError } from 'rxjs';
import { Category } from './../model/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  // private baseUrl = "http://localhost:8080/api/products?pageSize=10&pageNo=2";
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl).pipe(map((response) => {

      return response;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }

}
