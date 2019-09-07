package com.clickyman.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.clickyman.dto.ClickymanUser;
import com.clickyman.dto.UserDto;
import com.clickyman.dto.UserRequest;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	private JmsUserSenderService jmsUserService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			UserDto user = this.jmsUserService.findUserDetail(new UserRequest.FindUserDetailByUserName(username));
			return ClickymanUser.builder()
					.username(user.getUsername()).password(user.getPassword())
					.authorities(Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN")))
					.build();
		} catch (Exception e) {
			throw new UsernameNotFoundException("Username or password is incorrect");
		}
		
	}
	
}
