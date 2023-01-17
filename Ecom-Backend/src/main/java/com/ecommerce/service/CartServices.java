package com.ecommerce.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartDetailDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartDetail;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.CartDetailRepository;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;

@Service
public class CartServices {

	@Autowired
	CartDetailRepository cartDetailRepository;

	@Autowired
	CartRepository cartRepository;

	@Autowired
	ProductRepository productRepository;

	Logger logger = LoggerFactory.getLogger(this.getClass());

	public CartDetail addToCart(CartDetailDTO cartDto, User user) {
		Optional<Cart> tempCart = cartRepository.findByUserId(user.getId());
		Cart cart;
		if (tempCart.isPresent()) {
			cart = tempCart.get();

		} else {
			cart = new Cart();
			cart.setUserId(user.getId());
			cart = cartRepository.save(cart);
		}

		if (cartDto.getId() != null) {
			Optional<CartDetail> cartDet = cartDetailRepository.findById(cartDto.getId());

			if (cartDet.isPresent()) {

				CartDetail cartDetail = cartDet.get();
				cartDetail.setQuantity(cartDto.getQuantity());
				return cartDetailRepository.save(cartDetail);
				// return null;
			} else {
				CartDetail cartDetail = new CartDetail();
				Optional<Product> pro = productRepository.findById(cartDto.getProduct_id());

				cartDetail.setProduct(pro.get());
				cartDetail.setQuantity(cartDto.getQuantity());
				cartDetail.setCart(cart);
				cartDetail.setUnitPrice(cartDto.getUnit_price());
				return cartDetailRepository.save(cartDetail);
				// return null;
			}
		} else {
			// logger.info("here");
			CartDetail cartDetail = new CartDetail();
			Optional<Product> pro = productRepository.findById(cartDto.getProduct_id());
			Optional<CartDetail> tempCartDet = cartDetailRepository.findByProductId(cartDto.getProduct_id());
			if (tempCartDet.isPresent()) {
				cartDetail = tempCartDet.get();
				cartDetail.setQuantity(cartDto.getQuantity() + cartDetail.getQuantity());
			} else {
				cartDetail.setProduct(pro.get());
				cartDetail.setQuantity(cartDto.getQuantity());
				cartDetail.setUnitPrice(cartDto.getUnit_price());
				cartDetail.setCart(cart);
			}

			// logger.info(cartDetail.toString());

			return cartDetailRepository.save(cartDetail);

			// return null;
		}
		// return null;
		// cartRepository.save(cart);
		// return cart;
		// return cartDto;

	}

	public CartDTO getCartDto(User user) {
		Optional<Cart> cart = cartRepository.findByUserId(user.getId());

		if (cart.isPresent()) {
			return CartDTO.valueOf(cart.get());
		}
		return null;
	}

	public boolean deleteCartDetail(Long cartDetailId) {
		try {
			cartDetailRepository.deleteById(cartDetailId);
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	public boolean emptyCart(Long userId) {
		try {
			Optional<Cart> cart = cartRepository.findByUserId(userId);
			if (cart.isPresent()) {
				cartRepository.deleteById(cart.get().getId());
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			return false;
		}

	}
}
