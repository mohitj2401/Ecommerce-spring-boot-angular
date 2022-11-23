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

  CurrentCategoryId!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
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
}
