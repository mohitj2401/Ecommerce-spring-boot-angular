package com.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerce.entity.Country;

@CrossOrigin("http://localhost:4200")
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
	Optional<Country> findByCode(@RequestParam String code);
}
