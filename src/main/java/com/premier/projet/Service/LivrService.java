package com.premier.projet.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.premier.projet.Model.Compteur;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Livr;
import com.premier.projet.Model.Llivr;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.premier.projet.Dto.ListLivrFour;
import com.premier.projet.Model.Article;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Comm;
import com.premier.projet.Repository.ArticleRepository;
import com.premier.projet.Repository.CompteurRepository;
import com.premier.projet.Repository.LivrRepository;
import com.premier.projet.Repository.LlivrRepository;
@Service
@Transactional
public class LivrService {

	@Autowired LivrRepository repository ;
	@Autowired ArticleService artservice ;
	@Autowired ArticleRepository artRepository ;
	@Autowired LlivrRepository llivrrepository ;
	@Autowired CompteurService comptservice ;
	@Autowired CompteurRepository comptrepo;
	public List<Livr> getAll() {
		return repository.findAll(Sort.by("libelle").ascending());
	}

	public Optional<Livr> findById(Long id) {
		return repository.findById(id);
	}
	public Livr findByid(Long id) {
		return repository.findByid(id);
	}
	public Optional<Livr> findByCode(String code) {
		return repository.findByCode(code);
	}

	public long save(Livr livr) {
		
		  List<Llivr> llivrs = livr.getLlivrs();
		    for (Llivr lc : llivrs) {
	          	lc.setNumero(livr.getNumero());
	          	Optional<Article> artInfo = artservice.findByCode(lc.getCode());
		     	if (artInfo.isPresent()) {
			    	Article art = artInfo.get();
			           art.setStk_init(art.getStk_init()-lc.getQte());
			           art =   artRepository.save(art);
		     	}
	          	llivrrepository.save(lc);
		       }	 
		    Optional<Compteur> CompteurInfo = comptservice.findByAnnee(livr.getAnnee());
	     	if (CompteurInfo.isPresent()) {
		    	Compteur compteur = CompteurInfo.get();
		           compteur.setNumbl(compteur.getNumbl()+1);
		         compteur = comptrepo.save(compteur);
	     	}
	     	return repository.save(livr).getId();
			 
	
}
	public void delete(long id) {
		Optional<Livr> lv = repository.findById(id);
		if(	lv.isPresent()) {
			Livr Livr =  lv.get();
			llivrrepository.deleteByNumero(Livr.getNumero());
			repository.delete(Livr);
		}
		
		
	}
	
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	public void update(long id, Livr livr) {
		Optional<Livr> lv = repository.findById(id);
		if (lv.isPresent()) {
			Livr l = lv.get();
			l.setAnnee(livr.getAnnee());
			l.setNumero(livr.getNumero());
			l.setCode(livr.getCode());
			l.setLibcl(livr.getLibcl());
			l.setDate_mvt(livr.getDate_mvt());
			l.setSmtva(livr.getSmtva());
			l.setChauffeur(livr.getChauffeur());
			l.setCamion(livr.getCamion());
			l.setTotht(livr.getTotht());
			l.setTotrem(livr.getTotrem());
			l.setTotfodec(livr.getTotfodec());
			l.setTottva(livr.getTottva());
			l.setTotttc(livr.getTotttc());
			l.setNumfac(livr.getNumfac());
			l.setAnnee(livr.getAnnee());
			
			repository.save(l);
		}
		
	}

	public List<ListLivrFour> listLivrFour(int code) {
		return repository.listLivrFour(code);
	}


	
}
