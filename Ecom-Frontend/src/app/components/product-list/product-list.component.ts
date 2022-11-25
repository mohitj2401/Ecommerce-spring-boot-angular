import { SearchComponent } from './../search/search.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  previousKeyword!: string;
  keyword!: string;
  CurrentCategoryId!: number;
  previousCategoryId!: number;
  isSearch!: boolean;
  notFound!: boolean;

  pageSize: number = 10;
  page: number = 1;
  totalPage: number = 1;
  toialElements: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {

    this.isSearch = this.route.snapshot.paramMap.has('keyword');
    if (this.isSearch) {

      this.handerSearchListProduct();

    } else {
      this.handerListProduct();

    }
  }

  handerListProduct() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');



    if (hasCategoryId) {

      this.CurrentCategoryId = +this.route.snapshot.paramMap.get("id")!;

      if (this.CurrentCategoryId != this.previousCategoryId) {
        this.previousCategoryId = +this.route.snapshot.paramMap.get("id")!
        this.page = 1;
      }
      this.previousCategoryId = +this.route.snapshot.paramMap.get("id")!;

      this.productService.getProductListByCategoryPaginate(this.CurrentCategoryId, this.page - 1, this.pageSize).subscribe(this.processResukts());
    } else {
      this.productService.getProductListPaginate(this.page - 1, this.pageSize).subscribe(this.processResukts());
    }
  }


  handerSearchListProduct() {

    var keyword = this.route.snapshot.paramMap.get("keyword")!;


    if (keyword != this.previousKeyword) {
      this.page = 1;
    }
    this.previousKeyword = keyword;
    this.productService.getProductListByName(keyword, this.page - 1, this.pageSize).subscribe(this.processResukts());

  }



  processResukts() {
    return data => {
      this.products = data.content;
      this.page = data.page + 1;
      this.toialElements = data.totalElements;
      this.pageSize = data.size;
      this.totalPage = data.totalPages;
    };
  }

  updatePageSize(val) {
    this.pageSize = val.target.value;
    this.page = 1;
    this.listProducts();

  }
}
