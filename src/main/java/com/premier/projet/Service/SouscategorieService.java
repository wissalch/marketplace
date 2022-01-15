package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.premier.projet.Repository.SouscategorieRepository;

import com.premier.projet.Dto.ListCategorie;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Souscategorie;
import javax.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@Service
@Transactional
public class SouscategorieService {
	
	@Autowired
	SouscategorieRepository repository;
	
	

	 public List<ListCategorie> getAll() {
			System.out.println("Get all Sous Categories 11111...");
			return repository.listSouscateg();
			
		}

	public Optional<Souscategorie> findByCode(String code) {
		return repository.findByCode(code);
	}
	
	
	public long save(Souscategorie souscategorie) {
		System.out.println("Get all Categories 11111...");
	Souscategorie souscat = new Souscategorie()	;
	souscat.setCode(souscategorie.getCode());
	souscat.setLibelle(souscategorie.getLibelle());
	souscat.setCcateg(souscategorie.getCcateg());
	return repository.save(souscat).getId();
	}
	
	public void update(String code, Souscategorie souscategorie) {
		Optional<Souscategorie> souscateg = repository.findByCode(code);
		if (souscateg.isPresent()) {
			Souscategorie souscat = souscateg.get();
			souscat.setLibelle(souscategorie.getLibelle());
			souscat.setCcateg(souscategorie.getCcateg());
			repository.save(souscat);
		}
	}
	
	
	public void updateRang(String code, Souscategorie souscategorie) {
		Optional<Souscategorie> souscateg = repository.findByCode(code);
		if (souscateg.isPresent()) {
			Souscategorie souscat = souscateg.get();
			souscat.setRang(souscategorie.getRang()+1);
			repository.save(souscat);
		}
	}
	
	
	
	
	
	public List<Souscategorie>findByLibelle(String libelle) {
		return repository.findAllByLibelle(libelle);
		
	}
	public List<Souscategorie>findByCcateg(String code) {
		return repository.findAllByCcateg(code);
		
	}

	
	
	public void delete(String code) {
		Optional<Souscategorie> cat = repository.findByCode(code);
		cat.ifPresent(repository::delete);
	}
	
 public int max(String code)
 {return repository.max(code);
 }
     
     public int nbr(String code) {
    	 return repository.nbr(code);}

	public Optional<Souscategorie> findByCode(long id) {
		// TODO Auto-generated method stub
		return null;
	}

     
     
     
     
	}
		
		
		
		
		




