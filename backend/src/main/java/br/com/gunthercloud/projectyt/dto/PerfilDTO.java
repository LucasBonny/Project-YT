package br.com.gunthercloud.projectyt.dto;

import org.springframework.beans.BeanUtils;

import br.com.gunthercloud.projectyt.entity.PerfilEntity;

public class PerfilDTO {
	
	private Long id;

	private String descricao;
	
	public PerfilDTO() {
		
	}

	public PerfilDTO(Long id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}
	
	public PerfilDTO(PerfilEntity entity) {
		BeanUtils.copyProperties(entity, this);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
}
