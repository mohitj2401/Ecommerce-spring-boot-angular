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
  keyword!: string;
  CurrentCategoryId!: number;
  isSearch!: boolean;
  notFound!: boolean;

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
      this.productService.getProductListByCategory(this.CurrentCategoryId).subscribe((data) => {
        this.products = data;
      });
    } else {
      this.productService.getProductList().subscribe((data) => {
        this.products = data;
      });
    }
  }
  handerSearchListProduct() {

    var keyword = this.route.snapshot.paramMap.get("keyword")!;
    this.productService.getProductListByName(keyword).subscribe((data) => {
      this.products = data;
    });
    console.log(this.products);

  }
}
