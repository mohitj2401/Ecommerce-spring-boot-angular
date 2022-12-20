package com.ecommerce.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.PurchaseDTO;
import com.ecommerce.entity.User;
import com.ecommerce.jsonFormat.PurchaseResponse;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.CheckoutService;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/checkout")
public class CheckoutController {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private CheckoutService checkoutService;

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody PurchaseDTO purchase, Authentication authentication) {
		User user = userRepository.findByUsername(authentication.getName()).get();
		PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase, user);

		return purchaseResponse;
	}
}
