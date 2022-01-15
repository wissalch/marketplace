package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.premier.projet.Model.Lcomm;
import com.premier.projet.Model.Llivr;
import com.premier.projet.Repository.LlivrRepository;
@Service
@Transactional

public class LlivrService {
	@Autowired LlivrRepository repository ;
	
	
	public List<Llivr> getAll() {
		return repository.findAll(Sort.by("id").ascending());
	}
	
	
	public void delete(Long id) {
		Optional<Llivr> lv = repository.findById(id);
		lv.ifPresent(repository::delete);
		
	}


	public List<Llivr> findByNumero(int numero) {
			return repository.findAllByNumero(numero);
		}
	


	public long save(Llivr llivr) {
		Llivr l = new Llivr();	;
		l.setCode(llivr.getCode());
		l.setNumero(llivr.getNumero());
		l.setLibart(llivr.getLibart());
		l.setPu(llivr.getPu());
		l.setQte(llivr.getQte());
		l.setTva(llivr.getTva());
		l.setRem(llivr.getRem());
		l.setTotht(llivr.getTotht());
		l.setFodec(llivr.getFodec());
		l.setLivr(llivr.getLivr());
	return	repository.save(l).getId();
	}

	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}


	public List<Llivr> findByid(Long id) {
		return repository.findByid(id);
	}
	public Optional<Llivr> findById(Long id) {
		return repository.findById(id);
	}


	public void update(long id, Llivr llivr) {
		Optional<Llivr> lv = repository.findById(id);
		if (lv.isPresent()) {
			Llivr l = lv.get();
			l.setCode(llivr.getCode());
			l.setNumero(llivr.getNumero());
			l.setCode(llivr.getCode());
			l.setLibart(llivr.getLibart());
			l.setPu(llivr.getPu());
			l.setQte(llivr.getQte());
			l.setTva(llivr.getTva());
			l.setRem(llivr.getRem());
			l.setTotht(llivr.getTotht());
			l.setFodec(llivr.getFodec());
			l.setLivr(llivr.getLivr());
			repository.save(l);}
			
		
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
