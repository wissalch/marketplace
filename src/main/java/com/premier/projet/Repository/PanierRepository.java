package com.premier.projet.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.premier.projet.Dto.ListComm;
import com.premier.projet.Model.Panier;
@Repository
public interface PanierRepository extends JpaRepository<Panier, Long> {

	List<Panier> findAll(Sort ascending);

	Optional<Panier> findById(long id);

	Optional<Panier> findByAnnee(int annee);

	Optional<Panier> findByNumero(int numero);

	Optional<Panier> findByNom(String nom);


}