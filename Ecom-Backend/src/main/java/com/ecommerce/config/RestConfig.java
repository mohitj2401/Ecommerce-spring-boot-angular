package com.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnsupportedActions = { HttpMethod.POST, HttpMethod.POST, HttpMethod.DELETE };

		disableHttpMethod(Product.class, config, theUnsupportedActions);

		disableHttpMethod(ProductCategory.class, config, theUnsupportedActions);

		disableHttpMethod(Country.class, config, theUnsupportedActions);

		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
	}

	private void disableHttpMethod(@SuppressWarnings("rawtypes") Class theclass, RepositoryRestConfiguration config,
			HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration().forDomainType(theclass)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

}
