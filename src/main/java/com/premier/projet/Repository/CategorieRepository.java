package com.premier.projet.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;
import com.premier.projet.Model.Categorie;
@Repository

public interface CategorieRepository extends JpaRepository<Categorie, Long>{

	Optional<Categorie> findByCode(String code);
	List<Categorie> findAllByLibelle(String libelle);
	
	@Query(value = "SELECT count (code) fROM Categorie")
	public int nbr();
	
	@Query(value = "SELECT max (code) fROM Categorie")
	public int max();
}
