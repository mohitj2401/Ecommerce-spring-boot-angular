package com.ecommerce.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	ProductService service;

	@GetMapping
	public ResponseEntity<List<ProductDTO>> getAllProduyct() {
		return new ResponseEntity<>(service.getAllProduct(), HttpStatus.NO_CONTENT);

	}
}
