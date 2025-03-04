package br.com.gunthercloud.projectyt.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gunthercloud.projectyt.entity.UsuarioVerificadorEntity;

public interface UsuarioVerificadorRepository extends JpaRepository<UsuarioVerificadorEntity, Long> {

	Optional<UsuarioVerificadorEntity> findByUuid(UUID uuid);

}
