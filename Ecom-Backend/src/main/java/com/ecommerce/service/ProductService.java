package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.jsonFormat.SimplePage;
import com.ecommerce.repository.ProductRepository;

@Service
public class ProductService {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	ProductRepository repository;

	@Autowired
	FilesStorageService filesStorageService;

	public SimplePage<ProductDTO> getAllProduct(Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, "category_id"));

		Page<Product> products = repository.findAll(paging);
//		List<Product> products = repository.findAll();
		List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
//		if(products.hasContent()) {
//            return products.getContent();
//        } else {
//            return new ArrayList<EmployeeEntity>();
//        }

		products.getPageable();
		for (Product product : products.getContent()) {
			ProductDTO prodto = ProductDTO.valueOf(product);
			productDTOs.add(prodto);

		}
		return new SimplePage<>(productDTOs, products.getTotalElements(), paging);
//		return productDTOs;

	}

	public SimplePage<ProductDTO> getAllProductByCategory(Long categoryId, Integer pageNo, Integer pageSize,
			String sortBy) {
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
		return new SimplePage<>(productDTOs, products.getTotalElements(), paging);
	}

	public SimplePage<ProductDTO> getAllProductByName(String name, Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> products = repository.findByNameContaining(name, paging);
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
		return new SimplePage<>(productDTOs, products.getTotalElements(), paging);
	}

	public ProductDTO getProductById(Long productId) {

		Optional<Product> product = repository.findById(productId);
//		
		if (product.isPresent()) {
			ProductDTO prodto = ProductDTO.valueOf(product.get());
			return prodto;
		} else {
			return null;
		}

	}

	public Resource getProductImageById(String imageUrl) {

		return filesStorageService.load(imageUrl);
	}
}
