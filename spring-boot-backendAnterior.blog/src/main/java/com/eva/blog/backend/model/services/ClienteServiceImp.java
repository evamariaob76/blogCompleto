package com.eva.blog.backend.model.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eva.blog.backend.model.dao.IClienteDao;
import com.eva.blog.backend.models.entity.Cliente;
@Service 
public class ClienteServiceImp implements IClientesService{

	@Autowired
	private IClienteDao clienteDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {
		return (List<Cliente>) clienteDao.findAll();
	}

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		return clienteDao.save(cliente);
	}

	@Override
	@Transactional(readOnly = true)
	public Cliente findById(Long id) {
		return null;
	}

	@Override
	@Transactional
	public void delete(Long id) {
		
	}

}