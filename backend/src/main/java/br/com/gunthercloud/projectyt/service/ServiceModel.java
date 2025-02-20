package br.com.gunthercloud.projectyt.service;

import java.util.List;

public interface ServiceModel<T> {
	
	List<T> findAll();
	T findById(Long id);
	T insert(T obj);
	T update(Long id, T obj);
	void delete(Long id);
}
