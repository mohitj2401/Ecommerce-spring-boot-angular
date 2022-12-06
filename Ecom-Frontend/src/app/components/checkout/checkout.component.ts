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


  //Getters

  //Customer
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  //Shippinh Address
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipcode'); }

  //Billing Address
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipcode'); }

  //CreditCard
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardnameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardcardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardsecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  constructor(private formBuilder: FormBuilder, private cardFormService: CardFormService, private cartService: CartService, private checkoutService: CheckoutService, private router: Router) {

  }


  ngOnInit() {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
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
        ]]
      }),
      shippingAddress: this.formBuilder.group({
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
      billingAddress: this.formBuilder.group({
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
      creditCard: this.formBuilder.group({
        cardType: ['', [
          Validators.required,
        ]],
        nameOnCard: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        cardNumber: ['', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]],
        securityCode: ['', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]],
        expirationMonth: [''],
        expirationYear: ['']
      })
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
  }



  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
  }


  copyShippingAdd(event) {
    if (event.target.checked) {

      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
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
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.order = order;


    this.checkoutService.placeOrder(purchase).subscribe({
      next: (data) => {
        alert(`Your order has been recieved.\n Order number: ${data.orderTrackingNumber}`);
        this.resetCart();
      },
      error: (error) => {
        alert(`Something went wrong please try again.${error.message}`);
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

}
