package com.ecommerce.dto;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartDetail;
import com.ecommerce.entity.User;

import lombok.Data;

@Data
public class CartDTO {

	private Long id;

	private Long userId;

	private User user;

	private Set<CartDetail> cartDetails = new HashSet<>();

	private BigDecimal totalAmount;

	private Date dateCreated;

	private Date lastUpdated;

	public Cart createEntity() {
		Cart cart = new Cart();
		cart.setCartDetails(this.getCartDetails());
		cart.setDateCreated(this.getDateCreated());
		cart.setId(this.getId());
		cart.setLastUpdated(this.getLastUpdated());
		cart.setTotalAmount(this.getTotalAmount());
		return cart;
	}

	public static CartDTO valueOf(Cart cart) {
		CartDTO cartDto = new CartDTO();
		cartDto.setCartDetails(cart.getCartDetails());
		cartDto.setDateCreated(cart.getDateCreated());
		cartDto.setId(cart.getId());
		cartDto.setLastUpdated(cart.getLastUpdated());
		cartDto.setTotalAmount(cart.getTotalAmount());
		return cartDto;
	}

}
