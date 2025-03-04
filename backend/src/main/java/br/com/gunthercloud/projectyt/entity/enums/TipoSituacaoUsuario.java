package br.com.gunthercloud.projectyt.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TipoSituacaoUsuario {

	ATIVO("A", "Ativo"),
	INATIVO("I", "Inativo"),
	PENDENTE("P", "Pendente");

	private String codigo;
	private String descricao;
	
	private TipoSituacaoUsuario(String codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	@JsonValue
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	@JsonCreator
	public static TipoSituacaoUsuario doValor(String codigo) {
			switch (codigo) {
			case "A": {
				return ATIVO;
			}
			case "I": {
				return INATIVO;
			}
			case "P": {
				return PENDENTE;
			}
			default: {
				return null;
			}
		}
	}
}
