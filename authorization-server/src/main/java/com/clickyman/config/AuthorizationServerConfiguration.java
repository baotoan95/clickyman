package com.clickyman.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import com.clickyman.provider.TokenConverter;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Value("${app.security.secret}")
	private String jwtSecret;
	@Value("${app.security.exprireIn}")
	private int jwtExpireTimeInMs;
	@Value("${app.security.jwtRefreshExpireTimeInMs}")
	private int jwtRefreshExpireTimeInMs;
	@Value("classpath:clickyman.jks")
	private Resource jksFile;
	
	@Autowired
	private DataSource dataSource;
	
	@Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer.tokenKeyAccess("permitAll()") // Enable /oauth/token_key URL used by resource server to validate JWT tokens
            .checkTokenAccess("permitAll()") // Enable /oauth/check_token URL
            .passwordEncoder(passwordEncoder()); // BCryptPasswordEncoder(8) is used for oauth_client_details.user_secret
    }
	
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints
		.authenticationManager(authenticationManager)
		.tokenStore(tokenStore())
		.accessTokenConverter(accessTokenConverter());
	}
	
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//		clients.inMemory().withClient("clientID123")
//		.authorizedGrantTypes("password", "authorization_code", "refresh_token", "implicit")
//		.authorities("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT", "USER")
//		.scopes("read", "write")
//		.autoApprove(true)
//		.secret(passwordEncoder().encode("password123"))
//		.accessTokenValiditySeconds(jwtExpireTimeInMs)
//		.refreshTokenValiditySeconds(jwtRefreshExpireTimeInMs);
		clients.jdbc(dataSource);
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public TokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	}
	
	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		TokenConverter tokenConverter = new TokenConverter();
//		tokenConverter.setAccessTokenConverter(jwtTokenProvider);
//		tokenConverter.setSigningKey(jwtSecret);
		KeyStoreKeyFactory keyPair = new KeyStoreKeyFactory(jksFile, "baotoan1142".toCharArray());
		tokenConverter.setKeyPair(keyPair.getKeyPair("clickyman"));
		return tokenConverter;
	}
}
