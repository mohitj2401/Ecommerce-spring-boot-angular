import { HttpClient } from '@angular/common/http';
import { CartItem } from './../model/cart_item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  base_url: string = 'http://localhost:8080/api/cart/get';
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) { }
  addToCart(cartItem: CartItem) {
    var tempCart = this.cartItems.find((x) => x.productId == cartItem.productId);


    if (tempCart) {
      tempCart.quantity = tempCart.quantity + cartItem.quantity;
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

  increamentQuantity(cartItem: CartItem) {
    cartItem.quantity++;

    this.computeCartTotal();

  }
  removeItem(cartItem: CartItem) {
    var index = this.cartItems.findIndex((x) => x.productId == cartItem.productId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotal();
    }
  }

  addtoCartDb() {

    return this.httpClient.get(this.base_url).pipe();



  }
}
