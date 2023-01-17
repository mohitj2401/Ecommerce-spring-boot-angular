package com.ecommerce.entity;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "user_id")
	private Long userId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
	private User user;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cart")
	private Set<CartDetail> cartDetails = new HashSet<>();

	@Column(name = "total_amount")
	private BigDecimal totalAmount;

	@Column(name = "date_created")
	@CreationTimestamp
	private Date dateCreated;

	@Column(name = "last_updated")
	@UpdateTimestamp
	private Date lastUpdated;

	public void add(CartDetail item) {
		if (item != null) {
			if (cartDetails == null) {
				cartDetails = new HashSet<>();
			}
			cartDetails.add(item);
			totalAmount = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())).add(totalAmount);
			item.setCart(this);
		}
	}

	public BigDecimal getTotalAmount() {
		totalAmount = BigDecimal.valueOf(0);
		for (CartDetail cartDetail : this.cartDetails) {
			totalAmount = cartDetail.getUnitPrice().multiply(BigDecimal.valueOf(cartDetail.getQuantity()))
					.add(totalAmount);

		}
		return totalAmount;
	}

}
