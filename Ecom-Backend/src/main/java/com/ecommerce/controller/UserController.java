package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	UserRepository userRepository;

	@RequestMapping(value = "/username", method = RequestMethod.GET)
	@ResponseBody
	@PreAuthorize("hasRole('USER')or hasRole('ADMIN')")
	public User currentUserName(Authentication authentication) {

		return userRepository.findByUsername(authentication.getName()).get();
	}
}
