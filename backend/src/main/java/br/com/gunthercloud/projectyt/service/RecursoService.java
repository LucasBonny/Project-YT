package br.com.gunthercloud.projectyt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.RecursoDTO;
import br.com.gunthercloud.projectyt.entity.RecursoEntity;
import br.com.gunthercloud.projectyt.repository.RecursoRepository;

@Service
public class RecursoService {
	
	@Autowired
	private RecursoRepository recursoRepository;
	
	public List<RecursoDTO> listarTodos() {
		List<RecursoEntity> recurso = recursoRepository.findAll();
		return recurso.stream().map(RecursoDTO::new).toList();
	}
	
	public RecursoDTO buscarPorId(Long id) {
		if(recursoRepository.existsById(id)) {
			RecursoEntity entity = recursoRepository.findById(id).get();
			return new RecursoDTO(entity);
		}
		throw new IllegalArgumentException("O id informado não existe!");
	}
	
	public RecursoDTO insert(RecursoDTO obj) {
		RecursoEntity entity = new RecursoEntity(obj);
		entity = recursoRepository.save(entity);
		return new RecursoDTO(entity);
	}
	
	public RecursoDTO alterar(Long id, RecursoDTO obj) {
		if(!recursoRepository.existsById(id))
			throw new IllegalArgumentException("O id informado não existe!");
		obj.setId(id);
		return new RecursoDTO(recursoRepository.save(new RecursoEntity(obj)));
	}

	public void excluir(Long id) {
		if(!recursoRepository.existsById(id)) {
			throw new IllegalArgumentException("O id informado não existe!");
		}
		recursoRepository.deleteById(id);	
	}
}
