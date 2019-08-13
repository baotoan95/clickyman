package com.clickyman.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import com.clickyman.dto.ClickymanUser;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	@Override
	protected UserDetailsService userDetailsService() {
		ClickymanUser user = ClickymanUser.builder().username("user").password(passwordEncoder.encode("secret"))
				.authorities(Arrays.asList(new SimpleGrantedAuthority("USER"))).build();
		ClickymanUser userAdmin = ClickymanUser.builder().username("admin").password(passwordEncoder.encode("secret"))
				.authorities(Arrays.asList(new SimpleGrantedAuthority("ADMIN"))).build();
		return new InMemoryUserDetailsManager(user, userAdmin);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
}
