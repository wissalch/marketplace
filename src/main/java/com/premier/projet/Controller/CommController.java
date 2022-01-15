package com.premier.projet.Controller;

import java.util.List;
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

import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Dto.ListComm;
import com.premier.projet.Model.Comm;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Lpanier;
import com.premier.projet.Model.Panier;
import com.premier.projet.Model.User;
import com.premier.projet.Service.CommService;
import com.premier.projet.Service.LcommService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CommController {

	 @Autowired
	 private CommService commService;
	 @Autowired
	 private LcommService lcommService;
	@GetMapping("/comms")
	 
	 public List<Comm> list() {
		System.out.println("Get all Comms..."); 
		 return commService.getAll();

}
	
	 @GetMapping("/comms/{id}")
	 public ResponseEntity<Comm> getCommById(@PathVariable long id){
		 Optional<Comm> comm = commService.findById(id);
		 return comm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 
	 @GetMapping("/comms/num/{numero}")
	 public ResponseEntity<Comm> getCommByNumero(@PathVariable int numero){
		 Optional<Comm> comm = commService.findByNumero(numero);
		 return comm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 
	 
	 @PostMapping("/comms")
	 public long createComm(@RequestBody Comm comm) {
		 
		 System.out.println("save all Commande...");
	 return commService.save(comm);
	 }
	
	 @DeleteMapping("/comms/{id}")
	 public void delete(@PathVariable long id) {
	 commService.delete(id);
	 }
	 
	 
	 @DeleteMapping("/comms/delete")
	  public void deleteAllComms() {
	    System.out.println("Delete All Comms...");
	    commService.deleteAll();
	  }

	 @DeleteMapping("/comms/dell/{numero}")
	 public void delete(@PathVariable int numero) {
	 commService.Delete(numero);
	 }
	 
	 
	 @PutMapping("/comms/{id}")
	 public void update(@PathVariable long id ,@RequestBody Comm comm) {
	 Optional<Comm> cm = commService.findById(id);
	 if (cm.isPresent()) {
	 commService.update(id, comm);
	 } else {
	 commService.save(comm);
	 }
	 }
	 
	 @GetMapping("/comm/p/{nom}")
		public ResponseEntity<Comm> getcommbynom(@PathVariable(value = "nom") String nom){
			
			Optional<Comm> comm = commService.findByNom(nom);
			if (comm.isPresent()) {Comm l = comm.get();
			List<Lcomm> lcomms = lcommService.findByNumero(l.getNumero());
				
				l.setLcomms(lcomms);
			}
	 	 return comm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
		}
	 
     @GetMapping("/comm/f/{nom}")
     public ResponseEntity<Comm> getCommbyNom(@PathVariable String nom){
	 Optional<Comm> comm = commService.findByNom(nom);
	 return comm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
}
 
     
     @GetMapping("/comm/verif/{totttc}")
 	public List<Comm> listcommtotttc(@PathVariable double totttc) {
 		return commService.getAllByTotttc(totttc);
 			
 	}
}
