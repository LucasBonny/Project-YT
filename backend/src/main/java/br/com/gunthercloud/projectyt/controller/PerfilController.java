package br.com.gunthercloud.projectyt.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.com.gunthercloud.projectyt.dto.PerfilDTO;
import br.com.gunthercloud.projectyt.service.PerfilService;

@RestController
@RequestMapping(value = "/perfil")
@CrossOrigin
public class PerfilController implements ControllerModel<PerfilDTO> {
	
	@Autowired
	private PerfilService service;
	
	@GetMapping
	@Override
	public ResponseEntity<List<PerfilDTO>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}
	
	@GetMapping(value = "/{id}")
	@Override
	public ResponseEntity<PerfilDTO> findById(@PathVariable Long id) {
		return ResponseEntity.ok().body(service.findById(id));
	}

	@PostMapping
	@Override
	public ResponseEntity<PerfilDTO> insert(@RequestBody PerfilDTO obj) {
		if(obj.getId() != null) obj.setId(null);
		System.out.println(obj.getId() + " | " + obj.getDescricao());
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping(value = "/{id}")
	@Override
	public ResponseEntity<PerfilDTO> update(@PathVariable Long id, @RequestBody PerfilDTO obj) {
		obj = service.update(id,obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	@Override
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
