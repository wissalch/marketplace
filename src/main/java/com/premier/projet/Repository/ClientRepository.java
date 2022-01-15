package com.premier.projet.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Client;

@Repository



public interface ClientRepository extends  JpaRepository<Client, Long>{
	List<Client> findAllByLibelle(String libelle);
	Optional<Client> findByCode(String code);
	

	
	@Query(value = "SELECT code fROM Client")
	public int max();
	
}
