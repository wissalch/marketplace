package com.premier.projet.Controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premier.projet.Dto.ListComm;
import com.premier.projet.Model.Client;
import com.premier.projet.Model.Comm;
import com.premier.projet.Model.Compteur;
import com.premier.projet.Model.Livr;
import com.premier.projet.Model.Llivr;
import com.premier.projet.Model.Lpanier;
import com.premier.projet.Model.Panier;
import com.premier.projet.Model.Societe;
import com.premier.projet.Repository.CompteurRepository;
import com.premier.projet.Repository.LpanierRepository;
import com.premier.projet.Repository.PanierRepository;
import com.premier.projet.Service.CompteurService;
import com.premier.projet.Service.LpanierService;
import com.premier.projet.Service.PanierService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class PanierController {
	@Autowired PanierRepository repository;
	@Autowired LpanierService lpanierservice;
	@Autowired CompteurService comptservice;
	@Autowired ServletContext context;
	 @Autowired
	 private PanierService pservice;
 @GetMapping("/paniers")
 
 public List<Panier> list() {
	 
	 return pservice.getAll();
 }
 
 
 
 
 
 
 
	
 @PostMapping("/paniers")
 public long save(@RequestBody Panier panier) {
 
	 return pservice.save(panier);

	 
	 }

 
 
 @GetMapping("/paniers/5/{annee}")
 public ResponseEntity<Panier> getByAnnee(@PathVariable int annee){
	 Optional<Panier> cat = pservice.findByAnnee(annee);
	 System.out.println(" compteur...");
	 return cat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
 }
 @GetMapping("/panier/{numero}")
 public ResponseEntity<Panier> getByNumero(@PathVariable int numero){
	 Optional<Panier> cat = pservice.findByNumero(numero);
	 System.out.println(" compteur...");
	 return cat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
 }

 @PutMapping("/paniers/{numero}")
 public void update(@PathVariable int numero ,@RequestBody Panier panier) {
 Optional<Panier> p = pservice.findByNumero(numero);
 if (p.isPresent()) {
 pservice.update(numero, panier);
 } else {
 pservice.save(panier);
 }
 }
	 
 @GetMapping("/paniers/8/{annee}")
 public int getannee(Panier panier) {
	 System.out.println("get annee...");
	return pservice.GetAnnee(panier);
	}
	 
 

 
	@GetMapping("/panier/p/{nom}")
	public ResponseEntity<Panier> getpanierbynom(@PathVariable(value = "nom") String nom){
		
		Optional<Panier> panier = pservice.findByNom(nom);
		if (panier.isPresent()) {Panier l = panier.get();
		List<Lpanier> lpaniers = lpanierservice.findByNumero(l.getNumero());
			
			l.setLpaniers(lpaniers);
		}
 	 return panier.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
 
 
 }
 	
	

