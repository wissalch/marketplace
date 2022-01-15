package com.premier.projet.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.premier.projet.Model.Societe;
import com.premier.projet.Repository.SocieteRepository;
@Service
@Transactional
public class SocieteService {
	@Autowired
	SocieteRepository repository;
	public List<Societe> getAll() {
		System.out.println("Get all Societes...");
		return repository.findAll(Sort.by("id").ascending());
	}
	

	public Optional<Societe> findById(long id) {
		
			return repository.findById(id);
		}
	

	public Societe save(Societe societe) {
		Societe st = new Societe();
		st.setLibelle(societe.getLibelle());
		st.setLibcourt(societe.getLibcourt());
		st.setAdresse(societe.getAdresse());
		st.setTel1(societe.getTel1());
		st.setEmail(societe.getEmail());
		st.setMatf(societe.getMatf());
		st.setRib(societe.getRib());
		st.setNumc(societe.getNumc());
		st.setNumf(societe.getNumf());
		return repository.save(st);
	}
	
	public void delete(long id) {
		Optional<Societe> cat = repository.findById(id);
		cat.ifPresent(repository::delete);
		
	}

	public void update(long id, Societe societe) {
		Optional<Societe> soc = repository.findById(id);
		if (soc.isPresent()) {
			Societe st = soc.get();
			st.setLibelle(societe.getLibelle());
			st.setLibcourt(societe.getLibcourt());
			st.setAdresse(societe.getAdresse());
			st.setTel1(societe.getTel1());
			st.setEmail(societe.getEmail());
			st.setMatf(societe.getMatf());
			st.setRib(societe.getRib());
			st.setNumc(societe.getNumc());
			st.setNumf(societe.getNumf());
			repository.save(st);
		
	}
	}
	

	 public int max() {return repository.max();}
	    



}
