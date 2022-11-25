import { Product } from './../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    var productId = this.route.snapshot.paramMap.get("id")!;
    this.productService.getProductDetails(productId).subscribe((data) => {
      this.product = data;
    });

  }

}
