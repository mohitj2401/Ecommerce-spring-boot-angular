package com.ecommerce.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.PurchaseDTO;
import com.ecommerce.jsonFormat.PurchaseResponse;
import com.ecommerce.service.CheckoutService;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/checkout")
public class CheckoutController {

	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private CheckoutService checkoutService;

	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody PurchaseDTO purchase) {
		logger.info(purchase.getCustomer().getEmail());
		purchase.getOrderItems().forEach(e -> logger.info(e.getUnitPrice().toString()));
		PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

		return purchaseResponse;
	}
}
