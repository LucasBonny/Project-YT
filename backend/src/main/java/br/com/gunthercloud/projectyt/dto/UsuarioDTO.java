package br.com.gunthercloud.projectyt.dto;

import java.io.Serializable;

import org.springframework.beans.BeanUtils;

import br.com.gunthercloud.projectyt.entity.PerfilEntity;
import br.com.gunthercloud.projectyt.entity.UsuarioEntity;

public class UsuarioDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
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
	}
	public UsuarioDTO(UsuarioEntity usuario, PerfilEntity perfil) {
		BeanUtils.copyProperties(usuario, this);
		this.perfil = new PerfilDTO(perfil);
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

	@Override
	public String toString() {
		return "UsuarioDTO [id=" + id + ", nome=" + nome + ", login=" + login + ", senha=" + senha + ", email=" + email
				+ ", perfil()=" + getPerfil().getDescricao() + "]";
	}
	
	

}
