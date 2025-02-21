package br.com.gunthercloud.projectyt.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.gunthercloud.projectyt.dto.RecursoDTO;
import br.com.gunthercloud.projectyt.service.RecursoService;

@RestController
@RequestMapping(value = "/recurso")
@CrossOrigin
public class RecursoController implements ControllerModel<RecursoDTO> {
	
	@Autowired
	private RecursoService service;

	@GetMapping
	@Override
	public ResponseEntity<Page<RecursoDTO>> findAll(@PageableDefault(sort = "id") Pageable pageable) {
		return ResponseEntity.ok().body(service.findAll(pageable));
	}

	@GetMapping(value = "/{id}")
	@Override
	public ResponseEntity<RecursoDTO> findById(@PathVariable Long id) {
		return ResponseEntity.ok().body(service.findById(id));
	}
	
	@PostMapping
	@Override
	public ResponseEntity<RecursoDTO> insert(@RequestBody RecursoDTO objeto) {
		if(objeto.getId() != null) objeto.setId(null);
		service.insert(objeto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(objeto.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping(value = "/{id}")
	@Override
	public ResponseEntity<RecursoDTO> update(@PathVariable Long id, @RequestBody RecursoDTO objeto) {
		objeto = service.update(id, objeto);
		return ResponseEntity.ok().body(objeto);
	}
	
	@DeleteMapping(value = "/{id}")
	@Override
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
