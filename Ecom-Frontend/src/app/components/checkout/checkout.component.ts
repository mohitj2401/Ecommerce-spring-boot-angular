import { AuthService } from './../../services/auth.service';
import { CartItem } from './../../model/cart_item';
import { WindowRefService } from './../../services/window-ref.service';
import { OrderItem } from './../../model/order-item';
import { Order } from './../../model/order';
import { Purchase } from './../../model/purchase';
import { Router } from '@angular/router';
import { CheckoutService } from './../../services/checkout.service';
import { CartService } from './../../services/cart.service';
import { CustomValidators } from './../../validators/custom-validators';
import { State } from './../../model/state';
import { Country } from './../../model/country';
import { CardFormService } from './../../services/card-form.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {


  checkoutFormGroup!: FormGroup;
  totalQuantity = 0;
  totalPrice = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  cartItems: CartItem[] = [];
  loggedIn: boolean = false;

  //Getters

  //Customer
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  //Shippinh Address
  get shippingAddresslastName() { return this.checkoutFormGroup.get('shippingAddress.lastName'); }
  get shippingAddressemail() { return this.checkoutFormGroup.get('shippingAddress.email'); }
  get shippingAddressphone() { return this.checkoutFormGroup.get('shippingAddress.phone'); }
  get shippingAddressfirstName() { return this.checkoutFormGroup.get('shippingAddress.firstName'); }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  //Billing Address
  get billingAddresslastName() { return this.checkoutFormGroup.get('billingAddress.lastName'); }
  get billingAddressemail() { return this.checkoutFormGroup.get('billingAddress.email'); }
  get billingAddressphone() { return this.checkoutFormGroup.get('billingAddress.phone'); }
  get billingAddressfirstName() { return this.checkoutFormGroup.get('billingAddress.firstName'); }
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  //CreditCard
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardnameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardcardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardsecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  constructor(private formBuilder: FormBuilder, private cardFormService: CardFormService, private cartService: CartService, private checkoutService: CheckoutService, private router: Router, private winRef: WindowRefService, private authService: AuthService) {

  }


  ngOnInit() {
    if (this.cartService.cartItems.length == 0) {
      this.router.navigateByUrl("/products");
    }
    this.checkoutFormGroup = this.formBuilder.group({

      shippingAddress: this.formBuilder.group({
        firstName: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        lastName: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace

        ]],
        email: ['', [
          Validators.required,
          // Validators.minLength(2),
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        street: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        city: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        state: ['', [
          Validators.required,
        ]],
        country: ['', [
          Validators.required,
        ]],
        phone: ['', [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]],
        zipCode: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]]
      }),
      billingAddress: this.formBuilder.group({
        firstName: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        lastName: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace

        ]],
        email: ['', [
          Validators.required,
          // Validators.minLength(2),
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        phone: ['', [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]],
        street: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        city: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        state: ['', [
          Validators.required,

        ]],
        country: ['', [
          Validators.required,

        ]],
        zipCode: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]]
      }),

    });

    const startMonth = new Date().getMonth() + 1;
    this.cardFormService.getCreditCardMonths(startMonth).subscribe(data => {

      this.creditCardMonths = data;

    });

    this.cardFormService.getCreditCardYears().subscribe(data => {

      this.creditCardYears = data;

    });

    this.cardFormService.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.reviewCartDetails();
    this.authService.isLoggedIn.subscribe(data => this.loggedIn = data);
  }



  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
    this.cartItems = this.cartService.cartItems;
  }


  copyShippingAdd(event) {
    if (event.target.checked) {

      this.checkoutFormGroup.controls['shippingAddress'].setValue(this.checkoutFormGroup.controls['billingAddress'].value);
      this.shippingAddressStates = this.billingAddressStates;

    } else {
      this.checkoutFormGroup.controls['shippingAddress'].reset();
      this.shippingAddressStates = [];
    }

  }

  handleMonthYear() {
    const creditCardForm = this.checkoutFormGroup.get('creditCard');
    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardForm?.value.expirationYear);
    let startMonth = 0;
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.cardFormService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonths = data;
    });
  }

  getStates(formType: string) {
    const formGroup = this.checkoutFormGroup.get(formType);
    const countryCode = formGroup?.value.country.code;
    this.cardFormService.getStates(countryCode).subscribe(data => {

      if (formType == 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      formGroup?.get('state')?.setValue(data[0].name);
    });

  }

  onSubmit() {
    if (!this.loggedIn) {
      alert("please login first");
      this.router.navigateByUrl("login");
    }
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(x => new OrderItem(x));

    let purchase = new Purchase();

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingAddressCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.country = shippingAddressCountry.name;

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingAddressCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.country = billingAddressCountry.name;


    purchase.orderItems = orderItems;
    // purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.order = order;


    this.payWithRazor('11', purchase);


  }
  makeOrder(purchase: Purchase) {
    this.checkoutService.placeOrder(purchase).subscribe({
      next: (data) => {
        alert(`Your order has been recieved.\n Order number: ${data.orderTrackingNumber}`);
        this.resetCart();
      },
      error: (error) => {
        alert(`Please login first.${error.status}`);
      },
    });
  }
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");
  }
  payWithRazor(val, purchase) {
    const options: any = {
      key: 'rzp_test_s04L6ldGetC8Q9',
      amount: purchase.order.totalPrice * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      // order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      this.makeOrder(purchase);
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
