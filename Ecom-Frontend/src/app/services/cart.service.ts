import { CartItem } from './../model/cart_item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }
  addToCart(cartItem: CartItem) {
    var tempCart = this.cartItems.find((x) => x.productId == cartItem.productId);


    if (tempCart) {
      tempCart.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotal();

  }

  computeCartTotal() {
    var totalPrice = 0;
    var totalQuantity = 0;
    this.cartItems.forEach(element => {
      totalPrice += element.unitPrice * element.quantity;
      totalQuantity += element.quantity;
    });
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity == 0) {
      this.removeItem(cartItem);
    } else {
      this.computeCartTotal();
    }
  }
  removeItem(cartItem: CartItem) {
    var index = this.cartItems.findIndex((x) => x.productId == cartItem.productId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotal();
    }
  }
}
