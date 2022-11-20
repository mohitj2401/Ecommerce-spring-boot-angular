package com.ecommerce.dto;

import java.math.BigDecimal;
import java.sql.Date;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;

import lombok.Data;

@Data
public class ProductDTO {

	private Long id;

	private ProductCategory category;

	private String sku;

	private String name;

	private String description;

	private BigDecimal unitPrice;

	private String imageUrl;

	private boolean active;

	private int unitsInStock;

	private Date dateCreated;

	private Date lastUpdated;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {
		this.category = category;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public int getUnitsInStock() {
		return unitsInStock;
	}

	public void setUnitsInStock(int unitsInStock) {
		this.unitsInStock = unitsInStock;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public Product createEntity() {
		Product pro = new Product();
		pro.setName(this.getName());
		pro.setActive(this.isActive());
		pro.setCategory(this.getCategory());
		pro.setDateCreated(this.getDateCreated());
		pro.setDescription(this.getDescription());
		pro.setLastUpdated(this.getLastUpdated());
		pro.setImageUrl(this.getImageUrl());
		pro.setSku(this.getSku());
		pro.setId(this.getId());
		pro.setUnitPrice(this.getUnitPrice());
		pro.setUnitsInStock(this.getUnitsInStock());
		return pro;
	}

	public static ProductDTO valueOf(Product product) {
		ProductDTO pro = new ProductDTO();
		pro.setName(product.getName());
		pro.setActive(product.isActive());
		pro.setCategory(product.getCategory());
		pro.setDateCreated(product.getDateCreated());
		pro.setDescription(product.getDescription());
		pro.setLastUpdated(product.getLastUpdated());
		pro.setImageUrl(product.getImageUrl());
		pro.setSku(product.getSku());
		pro.setId(product.getId());
		pro.setUnitPrice(product.getUnitPrice());
		pro.setUnitsInStock(product.getUnitsInStock());
		return pro;
	}

}
