package br.com.gunthercloud.projectyt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.UsuarioDTO;
import br.com.gunthercloud.projectyt.entity.UsuarioEntity;
import br.com.gunthercloud.projectyt.repository.UsuarioRepository;

@Service
public class UsuarioService implements ServiceModel<UsuarioDTO> {
	
	@Autowired
	private UsuarioRepository repository;
	
	@Override
	public List<UsuarioDTO> findAll() {
		List<UsuarioEntity> usuarios = repository.findAll();
		return usuarios.stream().map(UsuarioDTO::new).toList();
	}
	
	@Override
	public UsuarioDTO findById(Long id) {
		return new UsuarioDTO(repository.findById(id).get());
	}

	@Override
	public UsuarioDTO insert(UsuarioDTO obj) {
		if(repository.existsByLogin(obj.getLogin())) 
			throw new IllegalArgumentException("Login já existe!");
		UsuarioEntity user = repository.save(new UsuarioEntity(obj));
		return new UsuarioDTO(user);
	}
	
	@Override
	public UsuarioDTO update(Long id, UsuarioDTO obj) {
		if(!repository.existsById(id))
			throw new IllegalArgumentException("Usuário não existe");
		obj.setId(id);
		return new UsuarioDTO(repository.save(new UsuarioEntity(obj)));
	}
	
	@Override
	public void delete(Long id) {
		UsuarioEntity user = repository.findById(id).get();
		repository.delete(user);
	}
	
}
