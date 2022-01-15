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
import com.premier.projet.Dto.ListCommFour;
import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Service.LcommService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class LcommController {
	
	@Autowired  private LcommService lcommService;
	 
		@GetMapping("/lcomms")
		 
		 public List<Lcomm> list() {
			System.out.println("Get all Lcomms..."); 
			 return lcommService.getAll();

	}
		
		 @GetMapping("/lcomm/{id}")
		 public ResponseEntity<Lcomm> getLcommById(@PathVariable long id){
			 Optional<Lcomm> lcomm = lcommService.findById(id);
			 return lcomm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
		 }
		 
		 @GetMapping("/lcomms/{numero}")
		 public List<Lcomm> getAllByNumero(@PathVariable int numero){
			 List<Lcomm> lcomm = lcommService.findByNumero(numero);
			 return lcomm;
		 }
		 
		 @PostMapping("/lcomms")
		 public long createLcomm(@RequestBody Lcomm lcomm) {
			 
			 System.out.println("save all Liste commande...");
		 return lcommService.save(lcomm);
		 }
		
		 @DeleteMapping("/lcomms/{id}")
		 public void delete(@PathVariable long id) {
		 lcommService.delete(id);
		 }
		 
		 
		 @DeleteMapping("/lcomms/delete")
		  public void deleteAllLcomms() {
		    System.out.println("Delete All Lcomms...");
		    lcommService.deleteAll();
		  }
		 
		 
		 @PutMapping("/lcomms/{id}")
		 public void update(@PathVariable long id ,@RequestBody Lcomm lcomm) {
		 Optional<Lcomm> lcm = lcommService.findById(id);
		 if (lcm.isPresent()) {
		 lcommService.update(id, lcomm);
		 } else {
		 lcommService.save(lcomm);
		 }
		 }

		 
		 
		 @GetMapping("/lcomm/four/{code}")
		 public List<ListCommFour> listcommfour(@PathVariable int code) {
			 System.out.println("Get all liste commande four");
		             return lcommService.listCommFourf(code);
		   }
}
