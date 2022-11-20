import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
    throw new Error('Method not implemented.');
  }
  listProducts() {
    this.productService.getProductList().subscribe((data) => {

      this.products = data;
    })
  }
}
