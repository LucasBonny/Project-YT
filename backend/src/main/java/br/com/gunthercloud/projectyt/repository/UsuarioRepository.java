package br.com.gunthercloud.projectyt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gunthercloud.projectyt.entity.UsuarioEntity;
import java.util.List;


public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>{

	boolean existsByLogin(String login);
	Optional<UsuarioEntity> findByLogin(String login);

}
