package br.com.gunthercloud.projectyt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.PerfilDTO;
import br.com.gunthercloud.projectyt.dto.UsuarioDTO;
import br.com.gunthercloud.projectyt.entity.UsuarioEntity;
import br.com.gunthercloud.projectyt.repository.PerfilRepository;
import br.com.gunthercloud.projectyt.repository.UsuarioRepository;

@Service
public class UsuarioService implements ServiceModel<UsuarioDTO> {

	@Autowired
	private UsuarioRepository repository;
	
	@Autowired
	private PerfilRepository perfil;
	
	@Override
	public Page<UsuarioDTO> findAll(Pageable pageable) {
		if(pageable.getSort().isEmpty()) pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id"));
		Page<UsuarioEntity> usuarios = repository.findAll(pageable);
		return usuarios.map(x -> new UsuarioDTO(x, x.getPerfil()));
	}
	
	@Override
	public UsuarioDTO findById(Long id) {
		var obj = repository.findById(id).get();
		return new UsuarioDTO(obj, obj.getPerfil());
	}

	@Override
	public UsuarioDTO insert(UsuarioDTO obj) {
		if(repository.existsByLogin(obj.getLogin())) 
			throw new IllegalArgumentException("Login já existe!");
		obj.setPerfil(new PerfilDTO(perfil.getReferenceById(obj.getPerfil().getId())));
		System.out.println(obj);
		UsuarioEntity user = repository.save(new UsuarioEntity(obj));
		System.out.println(user);
		return new UsuarioDTO(user, user.getPerfil());
	}
	
	@Override
	public UsuarioDTO update(Long id, UsuarioDTO obj) {
		if(!repository.existsById(id))
			throw new IllegalArgumentException("Usuário não existe");
		obj.setId(id);
		var entity = repository.save(new UsuarioEntity(obj));
		return new UsuarioDTO(entity, entity.getPerfil());
	}
	
	@Override
	public void delete(Long id) {
		UsuarioEntity user = repository.findById(id).get();
		repository.delete(user);
	}
	
}
