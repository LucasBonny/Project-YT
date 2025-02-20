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
	private UsuarioRepository usuarioRepository;
	
	@Override
	public List<UsuarioDTO> findAll() {
		List<UsuarioEntity> usuarios = usuarioRepository.findAll();
		return usuarios.stream().map(UsuarioDTO::new).toList();
	}
	
	@Override
	public UsuarioDTO findById(Long id) {
		return new UsuarioDTO(usuarioRepository.findById(id).get());
	}

	@Override
	public UsuarioDTO insert(UsuarioDTO obj) {
		if(usuarioRepository.existsByLogin(obj.getLogin())) 
			throw new IllegalArgumentException("Login já existe!");
		UsuarioEntity user = usuarioRepository.save(new UsuarioEntity(obj));
		return new UsuarioDTO(user);
	}
	
	@Override
	public UsuarioDTO update(Long id, UsuarioDTO obj) {
		if(!usuarioRepository.existsById(id))
			throw new IllegalArgumentException("Usuário não existe");
		obj.setId(id);
		return new UsuarioDTO(usuarioRepository.save(new UsuarioEntity(obj)));
	}
	
	@Override
	public void delete(Long id) {
		UsuarioEntity user = usuarioRepository.findById(id).get();
		usuarioRepository.delete(user);
	}
	
}
