package br.com.gunthercloud.projectyt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.UsuarioDTO;
import br.com.gunthercloud.projectyt.entity.UsuarioEntity;
import br.com.gunthercloud.projectyt.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<UsuarioDTO> listarTodos() {
		List<UsuarioEntity> usuarios = usuarioRepository.findAll();
		//return usuarios.stream().map(x -> new UsuarioDTO(x)).toList();
		return usuarios.stream().map(UsuarioDTO::new).toList();
	}

	public void criarUsuario(UsuarioDTO obj) {
		usuarioRepository.save(new UsuarioEntity(obj));
	}
	
	public UsuarioDTO alterarUsuario(UsuarioDTO obj) {
		UsuarioEntity u = usuarioRepository.save(new UsuarioEntity(obj));
		return new UsuarioDTO(u);
	}
	
	public void removerUsuario(Long id) {
		UsuarioEntity u = usuarioRepository.findById(id).get();
		usuarioRepository.delete(u);
	}
	
	public UsuarioDTO buscarPorId(Long id) {
		return new UsuarioDTO(usuarioRepository.findById(id).get());
	}
}
