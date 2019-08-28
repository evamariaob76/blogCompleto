package com.eva.blog.backend.model.services;

import java.util.List;

import com.eva.blog.backend.models.entity.Cliente;

public interface IClientesService {
	
	public List<Cliente> findAll();
	
	public Cliente save(Cliente cliente);
	
	public Cliente findById(Long id);
	
	public void delete(Long id);
}
