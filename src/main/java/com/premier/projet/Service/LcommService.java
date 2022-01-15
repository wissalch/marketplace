package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Dto.ListCommFour;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Compteur;
import com.premier.projet.Repository.LcommRepository;
import com.premier.projet.Repository.CompteurRepository;


@Service
@Transactional

public class LcommService {
	
	@Autowired LcommRepository repository ;
	@Autowired CompteurRepository comprepo ;
	@Autowired CompteurService comptservice;
	@Autowired ServletContext context;
	
	public List<Lcomm> getAll() {
		return repository.findAll(Sort.by("id").ascending());
	}

	public Optional<Lcomm> findById(long id) {
		return repository.findById(id);
	}

	public long save(Lcomm lcomm) {
		System.out.println("Get save lcomm...");
		Lcomm lc = new Lcomm()	;
		lc.setCode(lcomm.getCode());
		lc.setNumero(lcomm.getNumero());
		lc.setLibart(lcomm.getLibart());
		lc.setPu(lcomm.getPu());
		lc.setQte(lcomm.getQte());
		lc.setTva(lcomm.getTva());
		lc.setTotht(lcomm.getTotht());
		lc.setTottva(lcomm.getTottva());
		lc.setTotttc(lcomm.getTotttc());
		return repository.save(lc).getId();
		}
	
	
	public void delete(long id) {
		Optional<Lcomm> cm = repository.findById(id);
		cm.ifPresent(repository::delete);
	}

	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	public void update(long id, Lcomm lcomm) {
		Optional<Lcomm> cm = repository.findById(id);
		if (cm.isPresent()) {
			Lcomm lc = cm.get();
			
			lc.setCode(lcomm.getCode());
			lc.setNumero(lcomm.getNumero());
			lc.setLibart(lcomm.getLibart());
			lc.setPu(lcomm.getPu());
			lc.setQte(lcomm.getQte());
			lc.setTva(lcomm.getTva());
			lc.setTotht(lcomm.getTotht());
			lc.setTottva(lcomm.getTottva());
			lc.setTotttc(lcomm.getTotttc());
			repository.save(lc);
		}
	}

	public List<Lcomm> findByNumero(int numero) {
		return repository.findAllByNumero(numero);
	}

	public List<ListCommFour> listCommFourf(int code) {
		return repository.listCommFourr(code);
	}

	
	

}
