package br.com.gunthercloud.projectyt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.PerfilDTO;
import br.com.gunthercloud.projectyt.entity.PerfilEntity;
import br.com.gunthercloud.projectyt.repository.PerfilRepository;

@Service
public class PerfilService implements ServiceModel<PerfilDTO> {
	
	@Autowired
	private PerfilRepository repository;
	
	@Override
	public Page<PerfilDTO> findAll(Pageable pageable) {
		Page<PerfilEntity> usuarios = repository.findAll(pageable);
		return usuarios.map(PerfilDTO::new);
	}
	
	@Override
	public PerfilDTO findById(Long id) {
		return new PerfilDTO(repository.findById(id).get());
	}

	@Override
	public PerfilDTO insert(PerfilDTO obj) {
		obj.setId(null);
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
