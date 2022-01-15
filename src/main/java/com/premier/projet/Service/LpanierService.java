package com.premier.projet.Service;

import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.servlet.ServletContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Model.Client;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Lpanier;
import com.premier.projet.Model.Panier;
import com.premier.projet.Model.Societe;
import com.premier.projet.Model.User;
import com.premier.projet.Repository.LcommRepository;
import com.premier.projet.Repository.LpanierRepository;

@Service
@Transactional
public class LpanierService {

	@Autowired LpanierRepository repository ;
	@Autowired ServletContext context;
	@Autowired LcommRepository lcommRepository ;
	
	public List<Lpanier> getAll() {
		return repository.findAll(Sort.by("id").ascending());
	}

	public Optional<Lpanier> findById(long id) {
		return repository.findById(id);
	}

	public List<Lpanier> findByNumero(int numero) {
		return repository.findAllByNumero(numero);
	}

	public long save(Lpanier lpanier) {
		System.out.println("Get save lpanier...");
		Lpanier lp = new Lpanier()	;
		lp.setCode(lpanier.getCode());
		lp.setNumero(lpanier.getNumero());
		lp.setLibelle(lpanier.getLibelle());
		lp.setPv(lpanier.getPv());
		lp.setQte(lpanier.getQte());
		lp.setTva(lpanier.getTva());
		lp.setMontht(lpanier.getMontht());
		lp.setMonttva(lpanier.getMonttva());
		lp.setMontttc(lpanier.getMontttc());
		return repository.save(lp).getId();
		
	}

	public void delete(long id) {
		Optional<Lpanier> lp = repository.findById(id);
		lp.ifPresent(repository::delete);
		
	}

	public void update(long id, Lpanier lpanier) {	
		Optional<Lpanier> lpn = repository.findById(id);
	if (lpn.isPresent()) {
		Lpanier lp = lpn.get();
		
		lp.setCode(lpanier.getCode());
		lp.setNumero(lpanier.getNumero());
		lp.setLibelle(lpanier.getLibelle());
		lp.setPv(lpanier.getPv());
		lp.setQte(lpanier.getQte());
		lp.setTva(lpanier.getTva());
		lp.setMontht(lpanier.getMontht());
		lp.setMonttva(lpanier.getMonttva());
		lp.setMontttc(lpanier.getMontttc());
		repository.save(lp);
	}
		
	}

	public void savelcomm(List<Lpanier> lpanier) {
		
		 for (Lpanier lp : lpanier) {
		Lcomm lcomm = new Lcomm();
		lcomm.setNumero(lp.getNumero());
		lcomm.setCode(lp.getCode());
		lcomm.setLibart(lp.getLibelle());
		lcomm.setPu(lp.getPv());
		lcomm.setQte(lp.getQte());
		lcomm.setTotht(lp.getMontht());
		lcomm.setTottva(lp.getMonttva());
		lcomm.setTotttc(lp.getMontttc());
		lcommRepository.save(lcomm);
		 }
		
	}

	

	public void deleteall(int numero) {
	repository.deleteByNumero(numero);
		
	}
	
	
	
}
