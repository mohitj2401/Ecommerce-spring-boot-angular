import { CartService } from './../../services/cart.service';
import { CartItem } from './../../model/cart_item';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  ngOnInit(): void {
    this.listCartDetails();

  }

  constructor(private cartService: CartService) { }





  listCartDetails() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartItems = this.cartService.cartItems;

  }
  increamentQuantity(cartItem: CartItem) {
    this.cartService.increamentQuantity(cartItem);


  }
  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }
  removeItem(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }
}
