package com.eva.blog.backend.model.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.eva.blog.backend.models.entity.Comercio;

public interface IComercioDao extends CrudRepository<Comercio, Long> {
	 @Query(value="SELECT * FROM comercios WHERE nombre LIKE %:nombre%",nativeQuery = true)
	    List<Comercio> findByName(@Param("nombre")String nombre);

	}





