package com.premier.projet.Controller;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
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

import com.premier.projet.Model.Client;
import com.premier.projet.Model.Fournisseur;
import com.premier.projet.Model.Societe;
import com.premier.projet.Service.FournisseurService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FournisseurController {
	 @Autowired
 private FournisseurService fourService;
	 
	 @GetMapping("/fournisseurs/fr")
	 
	 public List<Fournisseur> list() {
		 
		 return fourService.getAll();
	 }
 
	 
	 
	 @GetMapping("/fournisseurs/{code}")
	 public ResponseEntity<Fournisseur> post(@PathVariable String code){
		 Optional<Fournisseur> four = fourService.findByCode(code);
		 return four.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 
	 @PostMapping("/fournisseurs")
	 public long save(@RequestBody Fournisseur fournisseur) {
		 System.out.println("save all fournisseurs 1111...");
	 return fourService.save(fournisseur);
	 }
	 
	 
	 
	 
	 
	 
	 
	 @PutMapping("/fournisseurs/9/{id}")
	 public void update(@PathVariable long id,@RequestBody Fournisseur fournisseur) {
	 Optional<Fournisseur> four = fourService.findById(id);
	 if (four.isPresent()) {
	 fourService.update(id, fournisseur);
	 } else {
	 fourService.save(fournisseur);
	 }
	 }
	
	 
	 
	 @DeleteMapping("/Fournisseurs/{id}")
	 public void delete(@PathVariable long id) {
	 fourService.delete(id);
	 }
	
	 
 }
	 
	 
	 
	
