package br.com.gunthercloud.projectyt.entity;

import java.io.Serializable;
import java.util.Objects;

import org.springframework.beans.BeanUtils;

import br.com.gunthercloud.projectyt.dto.PerfilDTO;
import br.com.gunthercloud.projectyt.dto.RecursoDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SW_RECURSO")
public class RecursoEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private String chave;
	
	public RecursoEntity() {
		
	}

	public RecursoEntity(Long id, String nome, String chave) {
		this.id = id;
		this.nome = nome;
		this.chave = chave;
	}
	
	public RecursoEntity(RecursoDTO recurso) {
		BeanUtils.copyProperties(recurso, this);
	}

	public RecursoEntity(PerfilDTO entity) {
		BeanUtils.copyProperties(entity, this);
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

	public String getChave() {
		return chave;
	}

	public void setChave(String chave) {
		this.chave = chave;
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
		RecursoEntity other = (RecursoEntity) obj;
		return Objects.equals(id, other.id);
	}

}
