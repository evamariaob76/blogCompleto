package com.eva.blog.backend.model.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eva.blog.backend.model.dao.IComercioDao;
import com.eva.blog.backend.models.entity.Cliente;
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
	@Transactional(readOnly = true)

	public Page<Comercio> findAll(Pageable pageable) {
		return comercioDao.findAll(pageable);
	}
	@Override
	@Transactional
	public Comercio save(Comercio comercio) {
		return comercioDao.save(comercio);
	}

	@Override
	@Transactional(readOnly = true)
	public Comercio findById(Long id) {
		return comercioDao.findById(id).orElse(null);
	}
	@Override
	@Transactional
	public void delete(Long id) {
		comercioDao.deleteById(id);

	}
	
	@Override
	@Transactional
	public Comercio addLike(Long id) {
		// Rescatamos comercio de base de datos
		Comercio comercio = this.findById(id);
		// Actualizo el número de likes en memoria
		comercio.setLikes(comercio.getLikes() + 1);
		// Guardamos en base de datos
		this.save(comercio);
		return comercio;
	}
	

	@Override
	@Transactional
		public List<Comercio> findByName(String nombre) {
			return (List<Comercio>) comercioDao.findByName(nombre);
		}
	
	@Override
	@Transactional
	public Comercio addVisitas(Long id) {
		// Rescatamos comercio de base de datos
		Comercio comercio = this.findById(id);
		// Actualizo el número de likes en memoria
		comercio.setVisitas(comercio.getVisitas() + 1);
		// Guardamos en base de datos
		this.save(comercio);
		return comercio;
	}

}


