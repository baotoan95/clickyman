package com.clickyman.provider;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.stereotype.Component;

import com.clickyman.dto.BaseToken;
import com.clickyman.dto.UserToken;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JwtTokenProvider extends DefaultAccessTokenConverter {
	@Value("${app.security.encryptionKey}")
	private String encryptionKey;
	@Value("${app.security.initVector}")
	private String initVector;
	
	@Override
	public Map<String, ?> convertAccessToken(OAuth2AccessToken token, OAuth2Authentication authentication) {
		Map<String, Object> claims = new HashMap<>();
		UserToken userToken = new UserToken();
		try {
			claims.put("data", encryptTokenPayload(userToken));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return claims;
	}

	private String encryptTokenPayload(BaseToken tokenContent) throws Exception {
		IvParameterSpec ivSpec = new IvParameterSpec(initVector.getBytes("UTF-8"));
		SecretKeySpec secretKeySpec = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
		cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivSpec);
		byte[] encryptedData = cipher.doFinal(new ObjectMapper().writeValueAsBytes(tokenContent));

		return Base64.encodeBase64String(encryptedData);
	}

	

}
