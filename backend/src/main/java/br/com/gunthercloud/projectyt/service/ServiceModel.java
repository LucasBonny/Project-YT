package br.com.gunthercloud.projectyt.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServiceModel<T> {
	
	Page<T> findAll(Pageable pageable);
	T findById(Long id);
	T insert(T obj);
	T update(Long id, T obj);
	void delete(Long id);
}
