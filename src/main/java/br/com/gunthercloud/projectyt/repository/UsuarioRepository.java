package br.com.gunthercloud.projectyt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gunthercloud.projectyt.entity.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>{

}
