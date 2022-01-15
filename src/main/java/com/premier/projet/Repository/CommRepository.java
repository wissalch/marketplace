package com.premier.projet.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.premier.projet.Dto.ListComm;
import com.premier.projet.Model.Comm;

@Repository
public interface CommRepository extends JpaRepository<Comm, Long>{

	List<Comm> findAll(Sort ascending);

	Optional<Comm> findById(long id);

	
	@Query(value = "SELECT new com.premier.projet.Dto.ListComm (a.id,a.code,a.libelle,a.pv,a.qte,a.tva,b.tottht,b.tottva,b.totttc,c.libelle,c.code)"
			+ "from Lpanier a, Panier b, Client c where a.numero = b.numero and b.nom = c.libelle "
			+ "and c.code = :code")
	List<ListComm> listComm(@Param("code") String code);

	Optional<Comm> findByNom(String nom);

	List<Comm> findAllByTotttc(double totttc);

	Optional<Comm> findByNumero(int numero);

}
