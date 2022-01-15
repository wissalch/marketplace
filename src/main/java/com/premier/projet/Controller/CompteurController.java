package com.premier.projet.Controller;

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
import com.premier.projet.Model.Compteur;
import com.premier.projet.Model.Panier;
import com.premier.projet.Service.CompteurService;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class CompteurController {
	

	@Autowired
	CompteurService compteService;
	
	 @GetMapping("/compteurs")
public List<Compteur> list() {
		 
		 return compteService.getAll();
	 }
	
	
	
	@GetMapping("/compteurs/{annee}")
	 public ResponseEntity<Compteur> getcompteurByAnnee(@PathVariable int annee){
		 Optional<Compteur> cat = compteService.findByAnnee(annee);
		 System.out.println(" compteur...");
		 return cat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }

	
	@GetMapping("/compteur/{id}")
	 public ResponseEntity<Compteur> getcompteurById(@PathVariable long id){
		 Optional<Compteur> cat = compteService.findById(id);
		 System.out.println(" compteur...");
		 return cat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }

	
	
	@PostMapping("/compteurs")
	 public Compteur createcompteur(@RequestBody Compteur compteur) {
		 
		 System.out.println("save all compteur...");
	 return compteService.save(compteur);
	 }
	

	@DeleteMapping("/compteurs/1/{id}")
	 public void delete(@PathVariable long id) {
	 compteService.delete(id);
	 }
	  
	 
	
	
	
	
	  //@DeleteMapping("/compteurs/delete")
	  //public void deleteAllCompteurs() {
	   // System.out.println("Delete All Compteurs...");
	 
	   // compteService.deleteAll();
	 
	
	//  }
	 
	

	 // @PutMapping("/compteurs/{id}")
	 // public void updatecompteur(@PathVariable Long id,@RequestBody Compteur compteur) {
	 //   System.out.println("Update Compteur with ID = " + id + "...");
	 
	  //  Optional<Compteur> CompteurInfo = compteService.findById(id);
	 
	    //if (CompteurInfo.isPresent()) {
	    //	compteService.update(id, compteur);
	  ///  } else {
	    //	compteService.save(compteur);
	   // }
	//  }
	  

}

