package com.eva.blog.backend.model.services;

import java.util.List;

import com.eva.blog.backend.models.entity.Cliente;
import com.eva.blog.backend.models.entity.Comercio;

public interface IComercioService {

	public List<Comercio> findAll();

	public Comercio save(Comercio comercio);

	public Comercio findById(Long id);

	public void delete(Long id);

	public Comercio addLike(Long id);
}