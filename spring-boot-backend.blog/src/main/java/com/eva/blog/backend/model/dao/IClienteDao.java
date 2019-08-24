package com.eva.blog.backend.model.dao;

import org.springframework.data.repository.CrudRepository;

import com.eva.blog.backend.models.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long>{

}
