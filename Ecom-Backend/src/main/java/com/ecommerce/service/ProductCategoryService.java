package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductCategoryDTO;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.repository.ProductCategoryRepository;

@Service
public class ProductCategoryService {

	@Autowired
	ProductCategoryRepository repository;

	public List<ProductCategoryDTO> getAllProductCategory() {

		List<ProductCategory> products = repository.findAll();
		List<ProductCategoryDTO> productDTOs = new ArrayList<ProductCategoryDTO>();
		for (ProductCategory product : products) {
			ProductCategoryDTO prodto = ProductCategoryDTO.valueOf(product);
			productDTOs.add(prodto);

		}
		return productDTOs;

	}

	public ProductCategoryDTO getCategoryDetail(Long productId) {
		Optional<ProductCategory> diary = repository.findById(productId);
		if (diary.isPresent()) {
			ProductCategory entityDiary = diary.get();
			ProductCategoryDTO prodto = ProductCategoryDTO.valueOf(entityDiary);
			return prodto;
		}

		return null;

	}
}
