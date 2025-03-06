package br.com.gunthercloud.projectyt.service;

import java.time.Instant;
import java.util.UUID;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.gunthercloud.projectyt.dto.PerfilDTO;
import br.com.gunthercloud.projectyt.dto.UsuarioDTO;
import br.com.gunthercloud.projectyt.entity.UsuarioEntity;
import br.com.gunthercloud.projectyt.entity.UsuarioVerificadorEntity;
import br.com.gunthercloud.projectyt.entity.enums.TipoSituacaoUsuario;
import br.com.gunthercloud.projectyt.repository.PerfilRepository;
import br.com.gunthercloud.projectyt.repository.UsuarioRepository;
import br.com.gunthercloud.projectyt.repository.UsuarioVerificadorRepository;

@Service
public class UsuarioService implements ServiceModel<UsuarioDTO> {

	@Autowired
	private UsuarioRepository repository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UsuarioVerificadorRepository usuarioVerificadorRepository;
	
	@Autowired
	private PerfilRepository perfil;
	
	@Autowired
	private EmailService emailService;
	
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
		obj.setId(null);
		obj.setPerfil(new PerfilDTO(perfil.getReferenceById(obj.getPerfil().getId())));
		obj.setSenha(passwordEncoderMethod(obj.getSenha()));
		obj.setSituacao(TipoSituacaoUsuario.PENDENTE);
		UsuarioEntity user = repository.save(new UsuarioEntity(obj));
		System.out.println(emailService.enviarEmailTexto("lucasbonnyb8@gmail.com", "Registro OK", user.toString()));
		return new UsuarioDTO(user, user.getPerfil());
	}
	
	@Override
	public UsuarioDTO update(Long id, UsuarioDTO obj) {
		if(!repository.existsById(id))
			throw new IllegalArgumentException("Usuário não existe");
		obj.setId(id);
		obj.setSenha(passwordEncoderMethod(obj.getSenha()));
		var entity = repository.save(new UsuarioEntity(obj));
		return new UsuarioDTO(entity, entity.getPerfil());
	}
	
	@Override
	public void delete(Long id) {
		UsuarioEntity user = repository.findById(id).get();
		repository.delete(user);
	}

	public String verificarCadastro(String uuid) {
	
		UsuarioVerificadorEntity usuarioVerificacao = usuarioVerificadorRepository.findByUuid(UUID.fromString(uuid)).get();
		
		if(usuarioVerificacao != null) {
			if(usuarioVerificacao.getDataExpiracao().compareTo(Instant.now()) >= 0) {
				
				UsuarioEntity u = usuarioVerificacao.getUsuario();
				repository.save(u);
				
				return "Usuário Verificado";
			}else {
				usuarioVerificadorRepository.delete(usuarioVerificacao);
				return "Tempo de verificação expirado";
			}
		}else {
			return "Usuario não verificado";
		}
		
	}
	
	private String passwordEncoderMethod(String password) {
		return passwordEncoder.encode(password);
	}
	
}
