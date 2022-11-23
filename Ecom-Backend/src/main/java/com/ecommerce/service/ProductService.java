package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

@Service
public class ProductService {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	ProductRepository repository;

	public List<ProductDTO> getAllProduct(Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> products = repository.findAll(paging);
//		List<Product> products = repository.findAll();
		List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
//		if(products.hasContent()) {
//            return products.getContent();
//        } else {
//            return new ArrayList<EmployeeEntity>();
//        }
		for (Product product : products.getContent()) {
			ProductDTO prodto = ProductDTO.valueOf(product);
			productDTOs.add(prodto);

		}
		return productDTOs;

	}

	public List<ProductDTO> getAllProductByCategory(Long categoryId, Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> products = repository.findByCategoryId(categoryId, paging);
//		List<Product> products = repository.findAll();
		List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
//		if(products.hasContent()) {
//            return products.getContent();
//        } else {
//            return new ArrayList<EmployeeEntity>();
//        }
		for (Product product : products.getContent()) {
			ProductDTO prodto = ProductDTO.valueOf(product);
			productDTOs.add(prodto);

		}
		return productDTOs;
	}
}
