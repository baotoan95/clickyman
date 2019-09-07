package com.clickyman.repositories;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.clickyman.entities.UserEntity;

@Repository
public interface UserRepository extends PagingAndSortingRepository<UserEntity, UUID> {
	public UserEntity findByUsername(String username);
	public UserEntity findFirstByUsernameOrEmail(String username, String email);
}
