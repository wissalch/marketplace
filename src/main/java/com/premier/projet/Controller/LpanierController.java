package com.premier.projet.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;

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

import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Model.Article;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Llivr;
import com.premier.projet.Model.Lpanier;
import com.premier.projet.Model.Societe;
import com.premier.projet.Service.LpanierService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class LpanierController {
	@Autowired private LpanierService lpanierService;
	@Autowired ServletContext context;
	
	@GetMapping("/lpaniers")
	 
	 public List<Lpanier> list() {
		System.out.println("Get all Lpanies..."); 
		 return lpanierService.getAll();

}
	
	
	
	 @GetMapping("/lpanier/{id}")
	 public ResponseEntity<Lpanier> getLpanierById(@PathVariable long id){
		 Optional<Lpanier> lpanier = lpanierService.findById(id);
		 return lpanier.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 
	 @GetMapping("/lpaniers/{numero}")
	 public List<Lpanier> getAllByNumero(@PathVariable int numero){
		 List<Lpanier> lpanier = lpanierService.findByNumero(numero);
		 return lpanier;
	 }
	 
	 @PostMapping("/lpaniers")
	 public long createLpanier(@RequestBody Lpanier lpanier) {
		 
		 System.out.println("save all Liste commande...");
	 return lpanierService.save(lpanier);
	 }
	
	 @DeleteMapping("/lpaniers/{id}")
	 public void delete(@PathVariable long id) {
		 lpanierService.delete(id);
	 }
	 
	 @DeleteMapping("/lpaniers/del/{numero}")
	 public void deleteallBynumero(@PathVariable int numero) {
		
		 lpanierService.deleteall(numero);
	 }
	
	 
	 @PutMapping("/lpaniers/{id}")
	 public void update(@PathVariable long id ,@RequestBody Lpanier lpanier) {
	 Optional<Lpanier> lP = lpanierService.findById(id);
	 if (lP.isPresent()) {
		 lpanierService.update(id, lpanier);
	 } else {
		 lpanierService.save(lpanier);
	 }
	 }

	 
	 
	 @GetMapping("/lpaniers/lc/{numero}")
	  public void savelcomm(@PathVariable(value = "numero") int numero) {
	    System.out.println("Get all lcomm..");
	 
	    List<Lpanier> Lpanier = lpanierService.findByNumero(numero);

	    	
	   lpanierService.savelcomm(Lpanier);
	
	
	    
	 } 

	
}
