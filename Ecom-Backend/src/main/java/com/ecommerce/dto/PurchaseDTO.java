package com.ecommerce.dto;

import java.util.Set;

import com.ecommerce.entity.Address;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class PurchaseDTO {

	private Address shippingAddress;

	private Address billingAddress;

	private Order order;

	private Set<OrderItem> orderItems;

}
