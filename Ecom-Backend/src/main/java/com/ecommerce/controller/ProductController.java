package com.ecommerce.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:4200/")
public class ProductController {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	ProductService service;

	@GetMapping
	public ResponseEntity<List<ProductDTO>> getAllProduyct(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "id") String sortBy) {
		List<ProductDTO> products = service.getAllProduct(pageNo, pageSize, sortBy);
		if (products.isEmpty()) {

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);

		}
		return new ResponseEntity<>(products, HttpStatus.OK);

	}

	@GetMapping("/category/{id}")
	public ResponseEntity<List<ProductDTO>> getAllProductByCategory(@PathVariable Long id,
			@RequestParam(defaultValue = "0") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		List<ProductDTO> products = service.getAllProductByCategory(id, pageNo, pageSize, sortBy);
		if (products.isEmpty()) {

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);

		}
		return new ResponseEntity<>(products, HttpStatus.OK);

	}
}
