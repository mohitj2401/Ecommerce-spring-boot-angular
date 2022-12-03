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
  get shippingAddressZipcode() { return this.checkoutFormGroup.get('shippingAddress.zipcode'); }

  //Billing Address
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipcode() { return this.checkoutFormGroup.get('billingAddress.zipcode'); }


  constructor(private formBuilder: FormBuilder, private cardFormService: CardFormService) {
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
        zipcode: ['', [
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
        zipcode: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]]
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        nameOnCard: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        cardNumber: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        securityCode: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        expirationMonth: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]],
        expirationYear: ['', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace
        ]]
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
    })
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
    const countryName = formGroup?.value.country.name;
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
    }
  }
}
