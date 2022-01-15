package com.premier.projet.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.premier.projet.Model.Societe;
@Repository
public interface SocieteRepository extends JpaRepository<Societe, Long> {

	List<Societe> findAll(Sort ascending);

	Optional<Societe> findById(long id);

	@Query(value = "SELECT max (numc) fROM Societe")
	public int max();

}
