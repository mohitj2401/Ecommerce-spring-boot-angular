package com.ecommerce.dto;

import java.util.Set;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;

import lombok.Data;

@Data
public class CountryDTO {

	private String name;

	private String code;

	private Set<State> states;

	public Set<State> getStates() {
		return states;
	}

	public void setStates(Set<State> states) {
		this.states = states;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public static CountryDTO valueOfWithStates(Country country) {
		CountryDTO countryDto = new CountryDTO();
		countryDto.setStates(country.getStates());
		countryDto.setCode(country.getCode());
		countryDto.setName(country.getName());
//		countryDto.setId(country.getId());
		return countryDto;
	}

	public static CountryDTO valueOf(Country country) {
		CountryDTO countryDto = new CountryDTO();
//		countryDto.setStates(country.getStates());
		countryDto.setCode(country.getCode());
		countryDto.setName(country.getName());
//		countryDto.setId(country.getId());
		return countryDto;
	}

}
