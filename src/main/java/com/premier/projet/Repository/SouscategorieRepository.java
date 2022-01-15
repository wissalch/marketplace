package com.premier.projet.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.premier.projet.Dto.ListCategorie;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Souscategorie;


@Repository

public interface SouscategorieRepository extends JpaRepository<Souscategorie, Long>{
	List<Souscategorie> findAllByLibelle(String libelle);
	 Optional<Souscategorie> findByCode(String code);
	
	
	@Query(value = "SELECT count (*) fROM Souscategorie WHERE ccateg = :code")
	public int nbr (@Param("code") String code);
	
	@Query(value = "SELECT max (code) fROM Souscategorie WHERE ccateg = :code")
	public int max (@Param("code") String code);

	
	@Query(value = "SELECT new com.premier.projet.Dto.ListCategorie (a.code,a.libelle,b.libelle,b.code)  from Souscategorie a join Categorie b "
			+ "on a.ccateg = b.code")
	 public List<ListCategorie> listSouscateg();
	List<Souscategorie> findAllByCcateg(String code);
	
	
	
	
	
}