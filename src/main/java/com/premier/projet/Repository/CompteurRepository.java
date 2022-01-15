package com.premier.projet.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.premier.projet.Model.Compteur;
@Repository

public interface CompteurRepository extends JpaRepository<Compteur, Long> {

	List<Compteur> findAll(Sort ascending);

	Optional<Compteur> findByAnnee(int annee);

	Optional<Compteur> findById(long id);

	

}
