package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.ProductCategoryDTO;
import com.ecommerce.service.ProductCategoryService;

@RestController
@RequestMapping("/product-category")
public class ProductCategoryController {

	@Autowired
	ProductCategoryService service;

	@GetMapping
	public ResponseEntity<List<ProductCategoryDTO>> getAllProductCategory() {

		return new ResponseEntity<>(service.getAllProductCategory(), HttpStatus.OK);

	}

	@GetMapping("/{productId}")
	public ResponseEntity<ProductCategoryDTO> getCategoryDetail(@PathVariable Long productId) {

		ProductCategoryDTO proDTO = service.getCategoryDetail(productId);
		if (proDTO == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(service.getCategoryDetail(productId), HttpStatus.OK);
	}
}
