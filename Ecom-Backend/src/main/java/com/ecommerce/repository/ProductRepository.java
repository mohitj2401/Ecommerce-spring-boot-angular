package com.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerce.entity.Product;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
	Page<Product> findByCategoryId(@PathVariable Long id, Pageable pagable);

	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pagable);
}
