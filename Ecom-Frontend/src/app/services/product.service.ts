import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/products/category/";
  private searchUrl = "http://localhost:8080/api/products/search/";

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(this.baseUrl).pipe(map((response) => {
      return response.content;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }
  getProductListPaginate(page: number, pageSize: number): Observable<GetResponseProduct> {
    return this.httpClient.get<GetResponseProduct>(this.baseUrl + `?pageNo=${page}&pageSize=${pageSize}`).pipe(map((response) => {
      return response;
    }), catchError(e => {


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


  getProductListByCategoryPaginate(categoryId: number, page: number, pageSize: number): Observable<GetResponseProduct> {
    return this.httpClient.get<GetResponseProduct>(this.categoryUrl + categoryId + `?pageNo=${page}&pageSize=${pageSize}`).pipe(map((response) => {


      return response;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }
  getProductListByName(keyword: string, page: number, pageSize: number): Observable<GetResponseProduct> {
    return this.httpClient.get<GetResponseProduct>(this.searchUrl + keyword + `?pageNo=${page}&pageSize=${pageSize}`).pipe(map((response) => {

      return response;
    }), catchError(e => {


      return [];
    }));

  }

  getProductDetails(keyword: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "/" + keyword).pipe(map((response) => {

      return response;
    }), catchError(e => {
      console.log(e["status"]);


      return [];
    }));

  }
}

interface GetResponseProduct {
  content: Product[];
  size: number,
  totalElements: number,
  totalPages: number,
  page: number,

}
