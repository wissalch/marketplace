package com.premier.projet.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

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
import com.premier.projet.Model.Societe;
import com.premier.projet.Service.SocieteService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SocieteController {
	
	@Autowired  SocieteService stservice;
	
	 @GetMapping("/societes")
	  public List<Societe> getAllSocietes() {
			 
			 return stservice.getAll();
		 }
	  
	
	@GetMapping("/societe/{id}")
	public ResponseEntity<Societe> getSocieteById(@PathVariable long id){
	Optional<Societe> cat = stservice.findById(id);
	 return cat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

	}
	

	@PostMapping("/societes")
	public Societe createSociete( @RequestBody Societe societe) {
		 System.out.println("save societe...");
		 return stservice.save(societe);
		
	}
	

	@DeleteMapping("/societes/{id}")
	 public void delete(@PathVariable long id) {
		stservice.delete(id);
	}

	
	 
	//  @DeleteMapping("/societes/delete")
	//  public ResponseEntity<String> deleteAllSocietes() {
	 //   System.out.println("Delete All Societes...");
	 
	 //   repository.deleteAll();
	 
	   // return new ResponseEntity<>("All Societes have been deleted!", HttpStatus.OK);
	  //}
	 
	

	  @PutMapping("/societes/{id}")
	  public void update(@PathVariable("id") long id, @RequestBody Societe Societe) {
	    System.out.println("Update Societe with ID = " + id + "...");
	 
	    Optional<Societe> soc = stservice.findById(id);
		 if (soc.isPresent()) {
		 stservice.update(id, Societe);
		 } else {
		 stservice.save(Societe);
		 }
		 }
	  
	  @GetMapping("/societes/7")
		 public int Maxnumc() {
			 System.out.println("Get maxnumc..");
			return stservice.max();}
			 
			 
		 }

