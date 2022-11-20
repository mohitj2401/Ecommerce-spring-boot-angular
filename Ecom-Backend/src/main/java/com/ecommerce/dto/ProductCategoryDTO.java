package com.ecommerce.dto;

import java.util.Set;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;

public class ProductCategoryDTO {
	private Long id;

	private String categoryName;

	private Set<Product> products;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}

	public ProductCategory createEntity() {
		ProductCategory proCat = new ProductCategory();
		proCat.setCategoryName(this.getCategoryName());
		proCat.setId(this.getId());
		return proCat;
	}

	public static ProductCategoryDTO valueOf(ProductCategory productCat) {
		ProductCategoryDTO proCatDTO = new ProductCategoryDTO();
		proCatDTO.setCategoryName(productCat.getCategoryName());
		proCatDTO.setId(productCat.getId());
		proCatDTO.setProducts(productCat.getProducts());
		return proCatDTO;
	}

}
