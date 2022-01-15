
package com.premier.projet.Controller;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Client;
import com.premier.projet.Model.Societe;
import com.premier.projet.Service.ClientService;
import com.premier.projet.Service.SocieteService;

 @CrossOrigin(origins = "http://localhost:4200")
 @RestController
 @RequestMapping("/api")
 public class ClientController {
	 @Autowired
	 private ClientService cliService;
	 @Autowired
	 private SocieteService societeService;
	 
	 @GetMapping("/clients")
	 
	 public List<Client> list() {
		 
		 return cliService.getAll();
	 }
	 
	 @GetMapping("/clients/{id}")
	 public ResponseEntity<Client> post(@PathVariable String id){
		 Optional<Client> cli = cliService.findById(id);
		 return cli.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 @GetMapping("/client/{code}")
	 public ResponseEntity<Client> findbycode(@PathVariable String code){
		 Optional<Client> cli = cliService.findBycode(code);
		 return cli.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	@PostMapping("/Clients")
	public long save(@RequestBody Client client)
	{
		return cliService.save(client);
		
	}
	 @PutMapping("/clients/{code}")
	 public void update(@PathVariable String code,@RequestBody Client client) {
	 Optional<Client> post = cliService.findByCode(code);
	 if (post.isPresent()) {
	 cliService.update(code, client);
	 } else {
	 cliService.save(client);
	 }
	
	 
	 }
	 @DeleteMapping("/clients/{code}")
	 public void delete(@PathVariable String code) {
	 cliService.delete(code);
	 }
	 
	 
	 
	 @GetMapping("/clients/7")
	 public int getMax() {
		 System.out.println("Get max...");
		return cliService.max();}
		 
		 
	 }
	
	 
 
	 
	 
	 
	