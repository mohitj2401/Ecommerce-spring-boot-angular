package com.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerce.entity.CartDetail;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
	Optional<CartDetail> findByProductId(@RequestParam Long productId);

}
