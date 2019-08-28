package com.eva.blog.backend.model.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eva.blog.backend.model.dao.IComercioDao;
import com.eva.blog.backend.models.entity.Comercio;

@Service
public class ComercioServiceImp implements IComercioService {
	
	@Autowired
	private IComercioDao comercioDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Comercio> findAll(){
		return (List<Comercio>) comercioDao.findAll();
	}

	@Override
	@Transactional
	public Comercio save(Comercio comercio) {
		return comercioDao.save(comercio);
	}

	@Override
	@Transactional(readOnly = true)
	public Comercio findById(Long id) {
		return null;
	}
	@Override
	@Transactional
	public void delete(Long id) {
		
	}
}
