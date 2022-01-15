package com.premier.projet.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.servlet.ServletContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Client;
import com.premier.projet.Model.Comm;
import com.premier.projet.Model.Compteur;
import com.premier.projet.Model.Lpanier;
import com.premier.projet.Model.Panier;
import com.premier.projet.Model.Societe;
import com.premier.projet.Model.User;
import com.premier.projet.Repository.CategorieRepository;
import com.premier.projet.Repository.CompteurRepository;
import com.premier.projet.Repository.LpanierRepository;
import com.premier.projet.Repository.PanierRepository;
import com.premier.projet.Dto.ListComm;
@Service
@Transactional
public class PanierService {
	@Autowired PanierRepository repository;
	@Autowired LpanierRepository repo;
	@Autowired CompteurService comptservice;
	@Autowired ServletContext context;
	 @Autowired
	 private PanierService pservice;
	 
	 @Autowired CompteurRepository comptRepository;
	 
	 


	public List<Panier> getAll() {
		System.out.println("Get all paniers...");
		return repository.findAll(Sort.by("numero").ascending());
		
	}
	
	

public Optional<Panier> findById(long id) {
	return repository.findById(id);
}


public long save(Panier panier) {
System.out.println("Get all panier...");
long id=1;
Optional<Compteur> CompteurInfo = comptservice.findById(id);
if(CompteurInfo.isPresent()) {
	 Compteur compteur = CompteurInfo.get();
	 compteur.setNumpanier(compteur.getNumpanier()+1);
	 compteur = comptRepository.save(compteur);
}

List<Lpanier> lpaniers = panier.getLpaniers();
for (Lpanier lc : lpaniers) {
	 lc.setNumero(panier.getNumero());
	 
	 repo.save(lc);


}
return repository.save(panier).getId();

}
public Optional<Panier> findByAnnee(int annee) {
	
		return repository.findByAnnee(annee);
	}



public int GetAnnee(Panier panier) {
	return panier.getAnnee();
}



public Optional<Panier> findByNumero(int numero) {
	return repository.findByNumero(numero);
}




public void update(int numero, Panier panier) {
	Optional<Panier> pn = repository.findByNumero(numero);
	if (pn.isPresent()) {
		Panier p = pn.get();
		p.setAnnee(panier.getAnnee());
		p.setNumero(panier.getNumero());
		p.setDate_mvt(panier.getDate_mvt());
		p.setNom(panier.getNom());
		p.setAdresse(panier.getAdresse());
		p.setSadresse(panier.getSadresse());
		p.setVille(panier.getVille());
		p.setCodep(panier.getCodep());
		p.setTel(panier.getTel());
		p.setTel1(panier.getTel1());
		p.setTottht(panier.getTottht());
		p.setTottva(panier.getTottva());
		p.setTotttc(panier.getTotttc());
		p.setModreg(panier.getModreg());
		p.setNumcarte(panier.getNumcarte());
		
		//List<Lpanier> lpaniers = panier.getLpaniers();
		//for (Lpanier lc : lpaniers) {
			// lc.setNumero(panier.getNumero());
			// repo.save(lc);}
		repository.save(p);
	}	
	
}



public Optional<Panier> findByNom(String nom) {
	
		return repository.findByNom(nom);
	}



}




	
	
	
	
	

