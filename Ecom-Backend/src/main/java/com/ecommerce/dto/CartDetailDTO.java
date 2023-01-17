package com.ecommerce.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartDetailDTO {

	private Long id;

	@NotNull
	private Long product_id;

	@NotNull
	private int Quantity;

	@NotNull
	private BigDecimal unit_price;

}
