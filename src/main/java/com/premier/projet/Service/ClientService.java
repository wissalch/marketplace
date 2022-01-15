package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.premier.projet.Repository.CategorieRepository;
import com.premier.projet.Repository.ClientRepository;
import com.premier.projet.Repository.FournisseurRepository;
import com.premier.projet.Repository.SocieteRepository;
import com.premier.projet.Repository.UserRepository;
import com.premier.projet.Repository.PanierRepository;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Client;
import com.premier.projet.Model.Comm;
import com.premier.projet.Model.Societe;
import com.premier.projet.Model.User;
import com.premier.projet.Model.Panier;
import javax.transaction.Transactional;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.domain.Sort;
@Service
@Transactional


public class ClientService {
	@Autowired
	ClientRepository repository;
	@Autowired UserRepository userRepository;
@Autowired SocieteRepository steRepository ;
@Autowired PanierRepository panierrepository;


	public List<Client> getAll() {
		return repository.findAll(Sort.by("libelle").ascending());
		
	}
	public Optional<Client> findById(String code) {
		return repository.findByCode(code);
	}
	
	 public long save(Client client) {
		 long id =1;
		 Optional<Societe> SocieteInfo = steRepository.findById(id);
		 if(SocieteInfo.isPresent())
		 { Societe ste = SocieteInfo.get();
		
		 ste.setNumc(ste.getNumc()+1);
		 ste = steRepository.save(ste);
			 
		 }
		 User user = new User();
		 user.setUsername(client.getLibelle());
		 user.setEmail(client.getEmail());
		 user.setCode(Integer.parseInt(client.getCode()));     
		 user.setPwd(client.getPwd());
		 user.setRole("CLIENT");
		 user.setActive(true);
		 userRepository.save(user);
		 
		 Panier panier = new Panier();
		 panier.setNom(client.getLibelle());
		 panierrepository.save(panier);
	 return repository.save(client).getId();
	 }
	
	
	
	
	
	
	
	public void update(String code, Client client) {
		Optional<Client> clie = repository.findByCode(code);
		if (clie.isPresent()) {
			Client cli = clie.get();
			cli.setLibelle(client.getLibelle());
			
			cli.setEmail(client.getEmail());
			cli.setLibelle(client.getLibelle());
			cli.setAdresse(client.getAdresse());
			cli.setTel(client.getTel());
			cli.setPwd(client.getPwd());
			repository.save(cli);
		}
	}
	public List<Client>findByLibelle(String libelle) {
		return repository.findAllByLibelle(libelle);
		
	}

	public void delete(String code) {
		Optional<Client> cli = repository.findByCode(code);
		if(	cli.isPresent()) {
			Client client = cli.get();
			userRepository.deleteByEmail(client.getEmail());
			repository.delete(client);
		}
	
	}
	
	
	public Optional<Client> findByCode(String code) {
		 
			return repository.findByCode(code);
		}
	
	

    public int max() {return repository.max();}
    
    
	public Optional<Client> findBycode(String code) {
		return repository.findByCode(code);
	}
    


	

	}
		
		
		
		
	
	
	
	


