package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.premier.projet.Repository.CategorieRepository;
import com.premier.projet.Repository.FournisseurRepository;
import com.premier.projet.Repository.SocieteRepository;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Client;
import com.premier.projet.Model.Fournisseur;
import com.premier.projet.Model.Societe;
import com.premier.projet.Model.User;
import com.premier.projet.Repository.UserRepository;
import javax.transaction.Transactional;
import org.springframework.data.domain.Sort;
@Service
@Transactional


public class FournisseurService {
	@Autowired
	FournisseurRepository repository;
@Autowired SocieteRepository steRepository ;
@Autowired UserRepository userRepository ;
	public List<Fournisseur> getAll() {
		System.out.println("Get all Fournisseurs 11111...");
		return repository.findAll(Sort.by("libelle").ascending());
		
	}
	public Optional<Fournisseur> findByCode(String code) {
		return repository.findByCode(code);
	}
	
	
	 public long save(@RequestBody Fournisseur fournisseur) {
		 long id =1;
		 Optional<Societe> SocieteInfo = steRepository.findById(id);
		 if(SocieteInfo.isPresent())
		 { Societe ste = SocieteInfo.get();
		//long s= ste.getId();
		 ste.setNumf(ste.getNumf()+1);
		 ste = steRepository.save(ste);
			 
		 }
		 User user = new User();
		 user.setUsername(fournisseur.getLibelle());
		 user.setNom(fournisseur.getLibelle());
		 user.setCode(fournisseur.getCode());
		 user.setEmail(fournisseur.getEmail());
		 user.setPwd(fournisseur.getPwd());
		 
		 user.setRole("fournisseur");
		 user.setActive(true);
		 userRepository.save(user);
		 
	 return repository.save(fournisseur).getId();
	 }
	
	
	
	
	public void update(long id, Fournisseur fournisseur) {
		Optional<Fournisseur> fourni = repository.findById(id);
		if (fourni.isPresent()) {
			Fournisseur four = fourni.get();
			four.setLibelle(fournisseur.getLibelle());
			four.setEmail(fournisseur.getEmail());
			four.setLibelle(fournisseur.getLibelle());
			four.setAdresse(fournisseur.getAdresse());
			four.setTel(fournisseur.getTel());
			four.setPwd(fournisseur.getPwd());
			four.setFax(fournisseur.getFax());
			repository.save(four);
		}
	}
	public List<Fournisseur>findByLibelle(String libelle) {
		return repository.findAllByLibelle(libelle);
		
	}

	public void delete(long id ) {
		Optional<Fournisseur> four = repository.findById(id);
		if(	four.isPresent()) {
			Fournisseur fourni = four.get();
			userRepository.deleteByEmail(fourni.getEmail());
			repository.delete(fourni);}
	}
	public Optional<Fournisseur> findById(long id) {
		return repository.findById(id);
	}
	
	
	
	

}
		
		
		
		
		




