package com.clickyman.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clickyman.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
	public UserEntity findByUsername(String username);
}
