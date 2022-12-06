package com.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.PurchaseDTO;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.jsonFormat.PurchaseResponse;
import com.ecommerce.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService {

	@Autowired
	private CustomerRepository customerRepository;

	@Override
	@Transactional
	public PurchaseResponse placeOrder(PurchaseDTO purchase) {

		Order order = purchase.getOrder();

		String trackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(trackingNumber);

		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));

		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());

		Customer customer = purchase.getCustomer();
		customer.add(order);

		customerRepository.save(customer);

		return new PurchaseResponse(trackingNumber);
	}

	private String generateOrderTrackingNumber() {

		return UUID.randomUUID().toString();

	}

}
