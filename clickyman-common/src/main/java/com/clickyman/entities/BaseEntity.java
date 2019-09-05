package com.clickyman.entities;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@MappedSuperclass
public class BaseEntity {
	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	private UUID id;
	
	@Column(nullable = false)
	private Date createdDate;
	
	@Column(nullable = false)
	private Date updatedDate;
	
	@PrePersist
	public void beforeInsert() {
		this.createdDate = new Date();
		this.updatedDate = new Date();
	}
	
	public void beforeUpdate() {
		this.updatedDate = new Date();
	}
}
