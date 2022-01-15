package com.premier.projet.Controller;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premier.projet.Dto.ListCategorie;
import com.premier.projet.Exception.ResourceNotFoundException;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.CategorieExcel;
import com.premier.projet.Model.Souscategorie;
import com.premier.projet.Model.SouscategorieExcel;
import com.premier.projet.Repository.CategorieRepository;
import com.premier.projet.Repository.SouscategorieRepository;
import com.premier.projet.Service.SouscategorieService;
 
 @CrossOrigin(origins = "http://localhost:4200")
 @RestController
 @RequestMapping("/api")
 public class SouscategorieController {
	 @Autowired
	 private SouscategorieService souscatService;
	 SouscategorieRepository repository;
	 private Souscategorie souscateg;
	 @GetMapping("/souscategories/7/{code}")
	
	 public int getCode(@PathVariable String code) {
		 
		 System.out.println("Get numbers...");
		 int x = souscatService.nbr(code);
		 System.out.println(x);
		 if (x==0)
		 { return 0;}
		 else {return souscatService.max(code);}
		 
		 
	 }
	 
	
	
	 
	
	
 @GetMapping("/souscategories")
	 
	 public List<ListCategorie> list() {
		 
		 return souscatService.getAll();
	 }



	 
	 @PostMapping("/souscategories")
	 public long save(@RequestBody Souscategorie souscategorie) {
		 
	 return souscatService.save(souscategorie);
	 }
	 
	 @PutMapping("/souscategories/{code}")
	 public void update(@PathVariable String code,@RequestBody Souscategorie souscategorie) {
	 Optional<Souscategorie> souscat = souscatService.findByCode(code);
	 if (souscat.isPresent()) {
	 souscatService.update(code, souscategorie);
	 } else {
	 souscatService.save(souscategorie);
	 }
	 }
	 
	 @PatchMapping("/souscategories/5/{code}")
	 public void updateRang (@PathVariable("code") String code,@RequestBody Souscategorie souscategorie) {
		 System.out.println("Update souscategorie with Code = " + code + "....");
		 Optional<Souscategorie> Souscat = souscatService.findByCode(code);
		 if (Souscat.isPresent()) {
			 
			 souscatService.updateRang(code, souscategorie);
	
		 }
		 else {
			 souscatService.save(souscategorie);
		 }
	 }
	 

  
	 
	 
	 @DeleteMapping("/souscategories/{code}")
	 public void delete(@PathVariable String code) {
	 souscatService.delete(code);
	 }
	
	 @GetMapping("/souscategories/5/{code}")
	 public ResponseEntity<List<Souscategorie>> listCateg(@PathVariable String code){
		List<Souscategorie> souscategories = souscatService.findByCcateg(code);
		 return new ResponseEntity<List<Souscategorie>>(souscategories, HttpStatus.OK);
	 }
	 
	  @GetMapping("/souscategories/export/excel")
	    public void exportToExcel(HttpServletResponse response) throws IOException {
	        response.setContentType("application/octet-stream");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=categories_" + currentDateTime + ".xlsx";
	        response.setHeader(headerKey, headerValue);
	        List<ListCategorie> listCategories = souscatService.getAll();
	        SouscategorieExcel excel = new SouscategorieExcel(listCategories);
	        excel.export(response);    
	    } 
	 
	  
		 @GetMapping("/souscategories/{id}")
		 public ResponseEntity<Souscategorie> post(@PathVariable String id){
			 Optional<Souscategorie> souscat = souscatService.findByCode(id);
			return souscat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
		 }
		
 }
  
 

 
 
	 
	 
	 
	