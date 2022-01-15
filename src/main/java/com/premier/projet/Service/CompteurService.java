package com.premier.projet.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Compteur;
import com.premier.projet.Model.Panier;
import com.premier.projet.Model.Societe;
import com.premier.projet.Repository.CompteurRepository;
@Service
@Transactional
public class CompteurService {
	@Autowired
	CompteurRepository repository;
	
	public List<Compteur> getAll() {
		System.out.println("Get all Compteurs...");
		return repository.findAll(Sort.by("annee").ascending());
		
	}
	public Optional<Compteur> findByAnnee(int annee) {
		return repository.findByAnnee(annee);
	}
	
	public Compteur save(Compteur compteur) {
		System.out.println("Get all Compteur...");
		Compteur cat = new Compteur()	;
		cat.setAnnee(compteur.getAnnee());
		cat.setNumpanier(compteur.getNumpanier());
		return repository.save(cat);
		}

	
	
public void delete(long id) {
	Optional<Compteur> cat = repository.findById(id);
	cat.ifPresent(repository::delete);
}

public void update(long id, Compteur compteur) {
	Optional<Compteur> compt = repository.findById(id);
	if (compt.isPresent()) {
		Compteur cat = compt.get();
		cat.setAnnee(compteur.getAnnee());
		repository.save(cat);
	}
}

public void deleteAll(long id) {
	//List<Compteur>	cat = repository.findAll(Sort.by("annee").ascending());

	//cat.delete();
}
public Optional<Compteur> findById(long id) {
	return repository.findById(id);
}






}
