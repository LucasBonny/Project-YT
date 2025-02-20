package br.com.gunthercloud.projectyt.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface ControllerModel<T> {

	ResponseEntity<List<T>> findAll();
	ResponseEntity<T> findById(Long id);
	ResponseEntity<T> insert(T obj);
	ResponseEntity<T> update(Long id, T obj);
	ResponseEntity<Void> delete(Long id);
	
}
