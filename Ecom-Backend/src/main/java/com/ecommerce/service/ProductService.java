package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

@Service
public class ProductService {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	ProductRepository repository;

	public List<ProductDTO> getAllProduct() {

		List<Product> products = repository.findAll();
		List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
		for (Product product : products) {
			ProductDTO prodto = ProductDTO.valueOf(product);
			productDTOs.add(prodto);

		}
		return productDTOs;

	}
}
