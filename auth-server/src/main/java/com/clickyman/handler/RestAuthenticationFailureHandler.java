package com.clickyman.handler;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		response.setStatus(HttpStatus.BAD_REQUEST.value());

		Map<String, Object> data = new HashMap<>();
		data.put("timestamp", new Date());
		data.put("status", HttpStatus.BAD_REQUEST.value());
		data.put("message", "Username or Password invalid");
		data.put("path", request.getRequestURL().toString());

		OutputStream out = response.getOutputStream();
		objectMapper.writeValue(out, data);
		out.flush();
	}

}
