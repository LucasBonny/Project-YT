package br.com.gunthercloud.projectyt.dto;

import java.io.Serializable;

import org.springframework.beans.BeanUtils;

import br.com.gunthercloud.projectyt.entity.RecursoEntity;

public class RecursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String chave;
	
	public RecursoDTO() {
		
	}
	
	public RecursoDTO(RecursoEntity recurso) {
		BeanUtils.copyProperties(recurso, this);
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
	
	
}
