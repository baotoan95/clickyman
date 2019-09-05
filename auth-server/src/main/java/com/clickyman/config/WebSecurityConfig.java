package com.clickyman.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.clickyman.services.UserService;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserService userDetails;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
	}
	
//	@Bean
//	@Override
//	protected UserDetailsService userDetailsService() {
//		ClickymanUser user = ClickymanUser.builder().username("user").password(passwordEncoder.encode("secret"))
//				.authorities(Arrays.asList(new SimpleGrantedAuthority("USER"))).build();
//		ClickymanUser userAdmin = ClickymanUser.builder().username("admin").password(passwordEncoder.encode("secret"))
//				.authorities(Arrays.asList(new SimpleGrantedAuthority("ADMIN"))).build();
//		return new InMemoryUserDetailsManager(user, userAdmin);
//	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetails).passwordEncoder(passwordEncoder);
	}
}
