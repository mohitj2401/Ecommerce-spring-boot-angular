package com.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
//	private Set<Order> orders = new HashSet<>();

//	public void add(Order order) {
//		if (order != null) {
//			if (orders == null) {
//				orders = new HashSet<>();
//			}
//			orders.add(order);
//			order.setCustomer(this);
//		}
//	}
}
