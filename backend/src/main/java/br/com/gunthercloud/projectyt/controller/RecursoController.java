package br.com.gunthercloud.projectyt.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
public class RecursoController {
	
	@Autowired
	private RecursoService recursoService;

	@GetMapping
	public ResponseEntity<List<RecursoDTO>> listarTodos() {
		return ResponseEntity.ok().body(recursoService.listarTodos());
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<RecursoDTO> buscarPorId(@PathVariable Long id) {
		return ResponseEntity.ok().body(recursoService.buscarPorId(id));
	}
	
	@PostMapping
	public ResponseEntity<RecursoDTO> inserir(@RequestBody RecursoDTO objeto) {
		recursoService.insert(objeto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(objeto.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<RecursoDTO> alterar(@PathVariable Long id, @RequestBody RecursoDTO objeto) {
		objeto = recursoService.alterar(id, objeto);
		return ResponseEntity.ok().body(objeto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		recursoService.excluir(id);
		return ResponseEntity.noContent().build();
	}
}
