import { CartItem } from './../../model/cart_item';
import { CartService } from './../../services/cart.service';
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
  quantity: number = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }


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
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity == 1) {

    } else {
      this.quantity--;

    }
  }
  addToCart(product: Product) {
    let cartItem = new CartItem(product);
    cartItem.quantity = this.quantity;
    this.cartService.addToCart(cartItem);

  }
}
