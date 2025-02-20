package br.com.gunthercloud.projectyt.dto;

import org.springframework.beans.BeanUtils;

import br.com.gunthercloud.projectyt.entity.UsuarioEntity;

public class UsuarioDTO {
	
	private Long id;
	private String nome;
	private String login;
	private String senha;
	private String email;
	private PerfilDTO perfil;
	
	public UsuarioDTO() {
		
	}
	
	public UsuarioDTO(Long id, String nome, String login, String senha, String email, PerfilDTO perfil) {
		this.id = id;
		this.nome = nome;
		this.login = login;
		this.senha = senha;
		this.email = email;
		this.perfil = perfil;
	}

	public UsuarioDTO(UsuarioEntity usuario) {
		BeanUtils.copyProperties(usuario, this);
		perfil = new PerfilDTO(usuario.getPerfil());
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public PerfilDTO getPerfil() {
		return perfil;
	}
	public void setPerfil(PerfilDTO perfil) {
		this.perfil = perfil;
	}

}
