package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CountryDTO;
import com.ecommerce.entity.Country;
import com.ecommerce.repository.CountryRepository;

@Service
public class CountryService {

	@Autowired
	CountryRepository country;

	public List<CountryDTO> getAllCountry() {
		List<Country> countries = country.findAll();
		List<CountryDTO> countryDtos = new ArrayList<>();
		for (Country country : countries) {
			CountryDTO countryDTO = CountryDTO.valueOf(country);
			countryDtos.add(countryDTO);
		}
		return countryDtos;
	}

	public CountryDTO getCountryByCode(String countryCode) {
		// TODO Auto-generated method stub
		Optional<Country> countryEntity = country.findByCode(countryCode);
		if (countryEntity.isPresent()) {
			CountryDTO countryDTO = CountryDTO.valueOfWithStates(countryEntity.get());
			return countryDTO;
		}
		return null;

	}

}
