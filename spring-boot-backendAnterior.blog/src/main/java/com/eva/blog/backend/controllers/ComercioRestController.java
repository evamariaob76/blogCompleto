package com.eva.blog.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eva.blog.backend.model.services.IComercioService;
import com.eva.blog.backend.models.entity.Cliente;
import com.eva.blog.backend.models.entity.Comercio;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ComercioRestController {
	@Autowired
	private IComercioService comercioService;
	
	@GetMapping("/comercios")
	public List<Comercio> index(){
		return comercioService.findAll();
		
	}
	
	
	@GetMapping("/comercios/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Comercio comercio= null;
		Map<String, Object> response = new HashMap<>();
	
		try {
			 comercio=comercioService.findById(id);	
		}
		catch(DataAccessException e) {
		
					response.put("mensaje", "Error al realizar la consulta en la base de datos");
					response.put("error",  e.getMessage().concat(":").concat(e.getMostSpecificCause().getMessage()));
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
					
		if(comercio==null) {	
		
						response.put("mensaje",  "el cliente con ID".concat(" : ").concat(id.toString().concat(" no existe en la base de datos")));
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

				}
					
		return new ResponseEntity(comercio, HttpStatus.OK);
	}
	@PostMapping("/comercios")
	public ResponseEntity<?> create(@Valid @RequestBody Comercio comercio, BindingResult result) {
		
		Comercio comercioNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {

			List<String> error = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("error", error);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			comercioNew = comercioService.save(comercio);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El like ha sido creado con éxito!");
		response.put("comercio", comercioNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
	
	
	@PutMapping("/comercios/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Comercio comercio, BindingResult result, @PathVariable Long id) {

		Comercio comercioActual = comercioService.findById(id);

		Comercio comercioUpdated = null;

		Map<String, Object> response = new HashMap<>();

		if(result.hasErrors()) {

			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if (comercioActual == null) {
			response.put("mensaje", "Error: no se pudo editar, el cliente ID: "
					.concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {

			comercioActual.setNombre(comercio.getNombre());
			comercioActual.setLikes(comercio.getLikes());

			comercioUpdated = comercioService.save(comercioActual);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el comercio en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El comercio ha sido actualizado con éxito!");
		response.put("cliente", comercioUpdated);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
	
	
	@DeleteMapping("/comercios/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> responseC = new HashMap<>();
		try {
			comercioService.delete(id);
		} catch (DataAccessException e) {
			responseC.put("mensaje", "Error al eliminar el comercio de la base de datos");
			responseC.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(responseC, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		responseC.put("mensaje", "El comercio eliminado con éxito!");	
		return new ResponseEntity<Map<String, Object>>(responseC, HttpStatus.OK);
	}
}

	