package br.com.gunthercloud.projectyt.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface ControllerModel<T> {

	ResponseEntity<Page<T>> findAll(Pageable pageable);
	ResponseEntity<T> findById(Long id);
	ResponseEntity<T> insert(T obj);
	ResponseEntity<T> update(Long id, T obj);
	ResponseEntity<Void> delete(Long id);
	
}
