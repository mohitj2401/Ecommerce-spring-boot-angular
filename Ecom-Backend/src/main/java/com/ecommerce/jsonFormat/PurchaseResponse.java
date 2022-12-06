package com.ecommerce.jsonFormat;

import lombok.Data;
import lombok.NonNull;

@Data
public class PurchaseResponse {
	@NonNull
	private String orderTrackingNumber;
}
