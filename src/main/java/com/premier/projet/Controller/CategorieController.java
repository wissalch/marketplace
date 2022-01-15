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
import com.premier.projet.Dto.ListCategorie;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.CategorieExcel;
import com.premier.projet.Service.CategorieService;
 
 @CrossOrigin(origins = "http://localhost:4200")
 @RestController
 @RequestMapping("/api")
 public class CategorieController {
	 @Autowired
	 private CategorieService catService;
	 
	 @GetMapping("/categories/7")
	 public int getCode() {
		 System.out.println("Get numbers...");
		 int x = catService.nbr();
		 System.out.println(x);
		 if (x==0)
		 { return 0;}
		 else {return catService.max();}
		 
		 
	 }
	 
	 @GetMapping("/categories")
	 
	 public List<Categorie> list() {
		 
		 return catService.getAll();
	 }
	 
	 @GetMapping("/categories/{id}")
	 public ResponseEntity<Categorie> post(@PathVariable String id){
		 Optional<Categorie> cat = catService.findByCode(id);
		 return cat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 
	 @PostMapping("/categories")
	 public long save(@RequestBody Categorie categorie) {
		 
		 System.out.println("save all Categories 1111...");
	 return catService.save(categorie);
	 }
	 
	 @PutMapping("/categories/{code}")
	 public void update(@PathVariable String code,@RequestBody Categorie categorie) {
	 Optional<Categorie> cat = catService.findByCode(code);
	 if (cat.isPresent()) {
	 catService.update(code, categorie);
	 } else {
	 catService.save(categorie);
	 }
	 }
	 @DeleteMapping("/categories/{code}")
	 public void delete(@PathVariable String code) {
	 catService.delete(code);
	 }
	
	   
	    @GetMapping("/categories/export/excel")
	    public void exportToExcel(HttpServletResponse response) throws IOException {
	        response.setContentType("application/octet-stream");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=categories_" + currentDateTime + ".xlsx";
	        response.setHeader(headerKey, headerValue);
	        List<Categorie> listCategories = catService.getAll();
	        CategorieExcel excel = new CategorieExcel(listCategories);
	        excel.export(response);    
	    } 
 }
	 
	 
	 
	