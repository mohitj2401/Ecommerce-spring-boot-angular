package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartDetailDTO;
import com.ecommerce.dto.ResponseDTO;
import com.ecommerce.entity.CartDetail;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.CartServices;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "**", maxAge = 3600)
public class CartController {
	@Autowired
	CartServices cartServices;

	@Autowired
	UserRepository userRepository;

	@PostMapping
	public ResponseEntity<CartDetail> addtoCart(@RequestBody CartDetailDTO cartDto, Authentication authentication) {

		User user = userRepository.findByUsername(authentication.getName()).get();
		CartDetail countryDtos = cartServices.addToCart(cartDto, user);
		return new ResponseEntity<>(countryDtos, HttpStatus.OK);

	}

	@GetMapping
	public CartDTO cart(Authentication authentication) {

		User user = userRepository.findByUsername(authentication.getName()).get();
		CartDTO cartDto = cartServices.getCartDto(user);
		return cartDto;
		// return new ResponseEntity<>(cartDto, HttpStatus.OK);
	}

	@PostMapping("/empty-cart")
	public ResponseDTO emptyCart(Authentication authentication) {

		User user = userRepository.findByUsername(authentication.getName()).get();
		boolean result = cartServices.emptyCart(user.getId());
		if (result) {
			return new ResponseDTO("Cart empty Successfully", 200, null);
		} else {
			return new ResponseDTO("Something Went Worng", 500, null);
		}
		// return new ResponseEntity<>(cartDto, HttpStatus.OK);
	}

	@PostMapping("/delete-cart-item/{cartDetailId}")
	public ResponseDTO deleteCartItem(@PathVariable Long cartDetailId) {

		boolean result = cartServices.deleteCartDetail(cartDetailId);
		if (result) {
			return new ResponseDTO("Item deleted Successfully", 200, null);
		} else {
			return new ResponseDTO("Something Went Worng", 500, null);
		}
		// return new ResponseEntity<>(cartDto, HttpStatus.OK);
	}

}
