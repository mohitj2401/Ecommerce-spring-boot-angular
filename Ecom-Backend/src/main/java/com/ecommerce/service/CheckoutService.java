package com.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.PurchaseDTO;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.User;
import com.ecommerce.jsonFormat.PurchaseResponse;
import com.ecommerce.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class CheckoutService {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private OrderRepository orderRepository;

	@Transactional
	public PurchaseResponse placeOrder(PurchaseDTO purchase, User user) {

		Order order = purchase.getOrder();

		String trackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(trackingNumber);

		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));

		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());

		order.setUserId(user.getId());
//		order.setUser(user);

		orderRepository.save(order);

		return new PurchaseResponse(trackingNumber);
	}

	private String generateOrderTrackingNumber() {

		return UUID.randomUUID().toString();

	}

}
