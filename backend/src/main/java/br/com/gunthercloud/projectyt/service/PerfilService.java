package br.com.gunthercloud.projectyt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.PerfilDTO;
import br.com.gunthercloud.projectyt.entity.PerfilEntity;
import br.com.gunthercloud.projectyt.repository.PerfilRepository;

@Service
public class PerfilService implements ServiceModel<PerfilDTO> {
	
	@Autowired
	private PerfilRepository repository;
	
	@Override
	public List<PerfilDTO> findAll() {
		List<PerfilEntity> usuarios = repository.findAll();
		return usuarios.stream().map(PerfilDTO::new).toList();
	}
	
	@Override
	public PerfilDTO findById(Long id) {
		return new PerfilDTO(repository.findById(id).get());
	}

	@Override
	public PerfilDTO insert(PerfilDTO obj) {
		PerfilEntity entity = repository.save(new PerfilEntity(obj));
		return new PerfilDTO(entity);
	}
	
	@Override
	public PerfilDTO update(Long id, PerfilDTO obj) {
		if(!repository.existsById(id))
			throw new IllegalArgumentException("Usuário não existe");
		obj.setId(id);
		return new PerfilDTO(repository.save(new PerfilEntity(obj)));
	}
	
	@Override
	public void delete(Long id) {
		PerfilEntity user = repository.findById(id).get();
		repository.delete(user);
	}
	
}
