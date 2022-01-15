package com.premier.projet.Controller;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Llivr;
import com.premier.projet.Service.LlivrService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class LlivrController {
	 @Autowired private LlivrService llivrService;
	
	@Autowired  ServletContext context;
	
	@GetMapping("/Llivrs")
	  public List<Llivr> getAllLlivrs() {
		return llivrService.getAll();
	}
		
		
	 @GetMapping("/llivrs/{numero}")
	  public List<Llivr> getAllByNumero(@PathVariable(value = "numero") int numero) {
	    System.out.println("Get all Lbon...");
	 
	    List<Llivr> Llivrs = llivrService.findByNumero(numero);
	 
	    return Llivrs;
	  }
		
		@PostMapping("/llivrs")
		public long createLlivr(@RequestBody Llivr Llivr){
			  System.out.println("Save Llivrs..."); 
			  return llivrService.save(Llivr);
			
				 }

		@DeleteMapping("/llivrs/{id}")
		public void deleteLlivr(@PathVariable(value = "id") Long id) {
		llivrService.delete(id);
		}
		
		  @DeleteMapping("/llivrs/delete")
		  public void deleteAllLlivrs() {
		    System.out.println("Delete All Llivrs...");
		    llivrService.deleteAll();
		  }
		
		  @PutMapping("/llivrs/{id}")
			 public void update(@PathVariable long id ,@RequestBody Llivr llivr) {
			 Optional<Llivr> lcm = llivrService.findById(id);
			 if (lcm.isPresent()) {
			 llivrService.update(id, llivr);
			 } else {
			 llivrService.save(llivr);
			 }
			 }
		
		
		
		
		
		
		
		
		

}
