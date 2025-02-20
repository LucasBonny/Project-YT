package br.com.gunthercloud.projectyt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.RecursoDTO;
import br.com.gunthercloud.projectyt.entity.RecursoEntity;
import br.com.gunthercloud.projectyt.repository.RecursoRepository;

@Service
public class RecursoService implements ServiceModel<RecursoDTO> {
	
	@Autowired
	private RecursoRepository recursoRepository;
	
	@Override
	public List<RecursoDTO> findAll() {
		List<RecursoEntity> recurso = recursoRepository.findAll();
		return recurso.stream().map(RecursoDTO::new).toList();
	}
	
	@Override
	public RecursoDTO findById(Long id) {
		if(recursoRepository.existsById(id)) {
			RecursoEntity entity = recursoRepository.findById(id).get();
			return new RecursoDTO(entity);
		}
		throw new IllegalArgumentException("O id informado não existe!");
	}
	
	@Override
	public RecursoDTO insert(RecursoDTO obj) {
		RecursoEntity entity = new RecursoEntity(obj);
		entity = recursoRepository.save(entity);
		return new RecursoDTO(entity);
	}
	
	@Override
	public RecursoDTO update(Long id, RecursoDTO obj) {
		if(!recursoRepository.existsById(id))
			throw new IllegalArgumentException("O id informado não existe!");
		obj.setId(id);
		return new RecursoDTO(recursoRepository.save(new RecursoEntity(obj)));
	}

	@Override
	public void delete(Long id) {
		if(!recursoRepository.existsById(id)) {
			throw new IllegalArgumentException("O id informado não existe!");
		}
		recursoRepository.deleteById(id);	
	}
}
