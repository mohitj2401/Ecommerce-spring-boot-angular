package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CountryDTO;
import com.ecommerce.service.CountryService;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin("http://localhost:4200/")
public class CountryController {

	@Autowired
	CountryService service;

	@GetMapping
	ResponseEntity<List<CountryDTO>> getAllCountry() {
		List<CountryDTO> countryDtos = service.getAllCountry();
		return new ResponseEntity<>(countryDtos, HttpStatus.OK);

	}

	@GetMapping("/{countryCode}")
	ResponseEntity<CountryDTO> getCountryById(@PathVariable String countryCode) {
		CountryDTO countryDto = service.getCountryByCode(countryCode);
		return new ResponseEntity<>(countryDto, HttpStatus.OK);

	}
}
