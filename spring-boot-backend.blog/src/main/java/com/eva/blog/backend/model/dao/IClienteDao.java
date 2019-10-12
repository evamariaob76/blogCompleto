package com.eva.blog.backend.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eva.blog.backend.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long>{

}
