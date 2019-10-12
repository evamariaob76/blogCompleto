package com.eva.blog.backend.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import com.eva.blog.backend.models.entity.Comercio;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface IComercioDao extends JpaRepository<Comercio, Long> {
	 @Query(value="SELECT * FROM comercios WHERE nombre LIKE %:nombre%",nativeQuery = true)
	    List<Comercio> findByName(@Param("nombre")String nombre);
	 


}

