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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.premier.projet.Dto.ListComm;
import com.premier.projet.Model.Comm;
import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Lpanier;
import com.premier.projet.Model.Compteur;
import com.premier.projet.Repository.CommRepository;
import com.premier.projet.Repository.CompteurRepository;
import com.premier.projet.Repository.LcommRepository;


@Service
@Transactional
public class CommService {

	@Autowired CommRepository repository ;
	@Autowired LcommRepository lcommrepository ;
	@Autowired CompteurRepository comprepo ;
	@Autowired CompteurService comptservice;
	@Autowired ServletContext context;
	
	public List<Comm> getAll() {
		return repository.findAll(Sort.by("nom").ascending());
	}

	public Optional<Comm> findById(long id) {
		return repository.findById(id);
	}

	public long save(Comm comm) {
		List<Lcomm> lcomms = comm.getLcomms();
	    for (Lcomm lc : lcomms) {
	        lc.setNumero(comm.getNumero());
	        lcommrepository.save(lc);
       		
       		long id=1;
       		Optional<Compteur> CompteurInfo = comptservice.findById(id);;
         	if (CompteurInfo.isPresent()) {
    	    	Compteur compteur = CompteurInfo.get();
    	           compteur.setNumcomm(compteur.getNumcomm()+1);
    	         compteur = comprepo.save(compteur);
	}
	
	    }
	    return repository.save(comm).getId();
	}

	

	
	
	
	public void delete(long id) {
		Optional<Comm> cm = repository.findById(id);
	if(	cm.isPresent()) { 
	   Comm Comm = cm.get();
	   lcommrepository.deleteByNumero(Comm.getNumero());
	   repository.delete(Comm);
		//(repository::delete);
	}
	}

	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	public void update(long id, Comm comm) {
		Optional<Comm> cm = repository.findById(id);
		if (cm.isPresent()) {
			Comm c = cm.get();
			c.setNom(comm.getNom());
			repository.save(c);
		}
	}
	
	
	public List<ListComm> listcomm(String code) {
		return repository.listComm(code);
	}

	public Optional<Comm> findByNom(String nom) {
		return repository.findByNom(nom);
	}

	public List<Comm> getAllByTotttc(double totttc) {
		return repository.findAllByTotttc(totttc);
	}

	public Optional<Comm> findByNumero(int numero) {
		return repository.findByNumero(numero);
	}

	public void Delete(int numero) {
		Optional<Comm> cm = repository.findByNumero(numero);
		if(	cm.isPresent()) { 
		   Comm Comm = cm.get();
		   repository.delete(Comm);
		}
		
	}

}
