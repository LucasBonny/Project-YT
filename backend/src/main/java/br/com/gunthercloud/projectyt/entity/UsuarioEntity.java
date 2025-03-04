package br.com.gunthercloud.projectyt.entity;

import java.io.Serializable;
import java.util.Objects;

import org.springframework.beans.BeanUtils;

import br.com.gunthercloud.projectyt.dto.UsuarioDTO;
import br.com.gunthercloud.projectyt.entity.enums.TipoSituacaoUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "SW_USUARIO")
public class UsuarioEntity implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String nome;

	@Column(nullable = false, unique = true)
	private String login;

	@Column(nullable = false)
	private String senha;

	@Column(nullable = false)
	private String email;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoSituacaoUsuario situacao;
	
	@ManyToOne
	@JoinColumn(name = "PERFIL_ID")
	private PerfilEntity perfil;
	
	public UsuarioEntity() {
		
	}
	
	public UsuarioEntity(UsuarioDTO usuario) {
		BeanUtils.copyProperties(usuario, this);
		perfil = new PerfilEntity(usuario.getPerfil());
	}

	public UsuarioEntity(Long id, String nome, String login, String senha, String email, PerfilEntity perfil) {
		this.id = id;
		this.nome = nome;
		this.login = login;
		this.senha = senha;
		this.email = email;
		this.perfil = perfil;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public TipoSituacaoUsuario getSituacao() {
		return situacao;
	}

	public void setSituacao(TipoSituacaoUsuario situacao) {
		this.situacao = situacao;
	}

	public PerfilEntity getPerfil() {
		return perfil;
	}

	public void setPerfil(PerfilEntity perfil) {
		this.perfil = perfil;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsuarioEntity other = (UsuarioEntity) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "UsuarioEntity [id=" + id + ", nome=" + nome + ", login=" + login + ", senha=" + senha + ", email="
				+ email + ", situacao=" + situacao + ", perfil=" + perfil.getDescricao() + "]";
	}

	
	
}
