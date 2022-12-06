package com.ecommerce.service;

import com.ecommerce.dto.PurchaseDTO;
import com.ecommerce.jsonFormat.PurchaseResponse;

public interface CheckoutService {
	PurchaseResponse placeOrder(PurchaseDTO purchse);
}
