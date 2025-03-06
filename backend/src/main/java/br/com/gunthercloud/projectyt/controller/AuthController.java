package br.com.gunthercloud.projectyt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gunthercloud.projectyt.dto.AuthenticationDTO;
import br.com.gunthercloud.projectyt.dto.UsuarioDTO;
import br.com.gunthercloud.projectyt.service.AuthService;
import br.com.gunthercloud.projectyt.service.UsuarioService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@Autowired
	private UsuarioService service;
	
	@PostMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationDTO authDto){
		return ResponseEntity.ok(authService.login(authDto));
	}
	
	@PostMapping(value = "/register")
	public ResponseEntity<UsuarioDTO> register(@RequestBody UsuarioDTO obj){
		return ResponseEntity.ok().body(service.insert(obj));
	}
	
	@GetMapping(value = "/check/{uuid}")
	public ResponseEntity<String> checkUserRegistration(@PathVariable String uuid) {
		return ResponseEntity.ok().body(service.checkRegistration(uuid));
	}
	
}