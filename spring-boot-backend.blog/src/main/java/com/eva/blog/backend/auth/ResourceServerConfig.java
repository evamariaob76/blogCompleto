package com.eva.blog.backend.auth;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/comercios",
				"/api/comercios/{id}",
				"/api/comercios/{nombre}/busqueda",
				"/api/comercios/page/**",
				"/api/comentarios",
				"/api/comentarios/{id}",
				"/api/comentarios/numero/{id_comercio}",
				"/api/descargas/img/{nombreFoto:.+}",
				"/api/comentarios/comercio/{id}").permitAll()
		.antMatchers(HttpMethod.POST, "/api/comercios/{id}/likes", 
				"/api/comercios/{id}/visitas",
				"/api/comercios",
				"/api/comercios/crear",
				"/api/comercios/upload",
				"/api/comentarios",
				"/api/comercios/foto",
				"/api/comentarios/{id}").permitAll()		
		.antMatchers(HttpMethod.PUT, "/comercios/{id}",
				"/api/comentarios/contestacion/{id_comercio}/{id}",
				"/api/comercios/{id}/comentario").permitAll()		
		.antMatchers(HttpMethod.DELETE, "/api/comercios/{id}",
				"/api/comentarios/{id}"
				).permitAll()		


		/*.antMatchers(HttpMethod.POST, "api/clientes","api/clientes/{id}").hasRole("ADMIN")
		.antMatchers("/api/clientes/**","api/comercios/**").hasRole("ADMIN")*/
		.anyRequest().authenticated()
		.and().cors().configurationSource(corsConfigurationSource());
	}
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
		config.setAllowCredentials(true);
		config.setAllowedHeaders(Arrays.asList("Content-Type", "authorization"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
		
		
	}

		@Bean
		public FilterRegistrationBean<CorsFilter> corsFilter(){
			
			FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource() ));
			bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
			return bean;
		}
	
}
