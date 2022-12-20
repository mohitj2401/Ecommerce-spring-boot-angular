package com.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email")
	private String email;

	@Column(name = "phone")
	private String phone;

	@Column(name = "city")
	private String city;

	@Column(name = "country")
	private String country;

	@Column(name = "state")
	private String state;

	@Column(name = "street")
	private String street;

	@Column(name = "street2", nullable = true)
	private String street2;

	@Column(name = "zip_code")
	private String zipCode;

	@OneToOne
	@PrimaryKeyJoinColumn
	private Order order;
}
