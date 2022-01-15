package com.premier.projet.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.ServletContext;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
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

import com.fasterxml.jackson.databind.JsonMappingException;
import com.premier.projet.Service.LivrService;
import com.premier.projet.Service.LlivrService;
import com.premier.projet.Dto.ListCommFour;
import com.premier.projet.Dto.ListLivrFour;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Comm;
import com.premier.projet.Model.Compteur;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Livr;
import com.premier.projet.Model.Llivr;
import com.premier.projet.Model.Lpanier;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class LivrController {
	 @Autowired private LivrService livrService;
	 @Autowired private LlivrService llivrService;
	@Autowired  ServletContext context;
	
	
	@GetMapping("/livrs")
	  public List<Livr> getAllLivrs() {
		return livrService.getAll();
		
	}
	
	@GetMapping("/livrs/{id}")
	public ResponseEntity<Livr> getBonById(@PathVariable(value = "id") long id){
		
		Optional<Livr> livr = livrService.findById(id);
		if (livr.isPresent()) {Livr l = livr.get();
		List<Llivr> llivrs = llivrService.findByNumero(l.getNumero());
			
			l.setLlivrs(llivrs);
		}
    	 return livr.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	@DeleteMapping("/livrs/{id}")
	public void deleteLivr(@PathVariable(value = "id") Long id) {
	livrService.delete(id);
	}
	 
	  @DeleteMapping("/livrs/delete")
	  public void deleteAllLivrs() {
	    System.out.println("Delete All Livrs...");
	    livrService.deleteAll();
	  }
	  
	 
	  @PutMapping("/livrs/{id}")
	  public void updateLivr(@PathVariable("id") long id, @RequestBody Livr Livr) {
	    System.out.println("Update Livr with ID = " + id + "...");
	    Optional<Livr> LivrInfo = livrService.findById(id);
	    if (LivrInfo.isPresent()) {
	    	
				 livrService.update(id, Livr);
				 } else {
				 livrService.save(Livr);
				 }
	  }	
	  @PostMapping("/livrs")
		  public long createLivr(@Valid @RequestBody Livr Livr) {
				 
				 System.out.println("save all livr...");

				return livrService.save(Livr);}
	  
	  
	  
	  @GetMapping("/livr/four/{code}")
		 public List<ListLivrFour> listcommfour(@PathVariable int code) {
			 System.out.println("Get all liste commande four");
		             return livrService.listLivrFour(code);
		   }
	  
	  
}
