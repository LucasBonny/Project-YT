package br.com.gunthercloud.projectyt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.RecursoDTO;
import br.com.gunthercloud.projectyt.entity.RecursoEntity;
import br.com.gunthercloud.projectyt.repository.RecursoRepository;

@Service
public class RecursoService implements ServiceModel<RecursoDTO> {
	
	@Autowired
	private RecursoRepository repository;
	
	@Override
	public Page<RecursoDTO> findAll(Pageable pageable) {
		Page<RecursoEntity> recurso = repository.findAll(pageable);
		return recurso.map(RecursoDTO::new);
	}
	
	@Override
	public RecursoDTO findById(Long id) {
		if(repository.existsById(id)) {
			RecursoEntity entity = repository.findById(id).get();
			return new RecursoDTO(entity);
		}
		throw new IllegalArgumentException("O id informado não existe!");
	}
	
	@Override
	public RecursoDTO insert(RecursoDTO obj) {
		obj.setId(null);
		RecursoEntity entity = new RecursoEntity(obj);
		entity = repository.save(entity);
		return new RecursoDTO(entity);
	}
	
	@Override
	public RecursoDTO update(Long id, RecursoDTO obj) {
		if(!repository.existsById(id))
			throw new IllegalArgumentException("O id informado não existe!");
		obj.setId(id);
		return new RecursoDTO(repository.save(new RecursoEntity(obj)));
	}

	@Override
	public void delete(Long id) {
		if(!repository.existsById(id)) {
			throw new IllegalArgumentException("O id informado não existe!");
		}
		repository.deleteById(id);	
	}
}
